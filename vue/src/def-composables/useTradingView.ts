import { ref, type Ref } from 'vue';
import { useClient } from '../composables/useClient';
import { useAddress } from './useAddress';
import { Chart, registerables } from 'chart.js';
import useCosmosBankV1Beta1 from "@/composables/useCosmosBankV1Beta1";
import { env } from '@/env';

Chart.register(...registerables);

export interface TokenData {
  denom: string;
  ticker: string;
  description: string;
  owner: string;
  precision: number;
  url: string;
  bonding_curve_enabled: boolean;
  virtual_token_reserves: string;
  virtual_fandom_reserves: string;
  real_token_reserves: string;
  real_fandom_reserves: string;
  initial_virtual_token_reserves: string;
  initial_virtual_fandom_reserves: string;
  initial_real_token_reserves: string;
}

export interface BuyEstimate {
  tokensOut: number;
  priceImpact: string;
}

export interface SellEstimate {
  fandomOut: number;
  priceImpact: string;
}

export interface Message {
  type: 'error' | 'success';
  text: string;
}

export function useTradingView() {
  const client = useClient();
  const { address } = useAddress();

  // State
  const selectedDenom = ref('');
  const denoms = ref<any[]>([]);
  const tokenData = ref<TokenData | null>(null);
  const currentPrice = ref('0');
  const progress = ref('0');
  const tokensSold = ref(0);
  const tokensRemaining = ref(0);
  const loading = ref(false);
  const message = ref<Message | null>(null);

  // Buy/Sell state
  const buyAmount = ref(0);
  const sellAmount = ref(0);
  const buySlippage = ref(2);
  const sellSlippage = ref(2);
  const buyEstimate = ref<BuyEstimate | null>(null);
  const sellEstimate = ref<SellEstimate | null>(null);

  // User balances
  const userFandomBalance = ref('0');
  const userTokenBalance = ref('0');

  // Chart
  let chartInstance: Chart | null = null;

  // API base URL (from environment)
  const API_BASE_URL = env.apiURL;

  /**
   * Load all available denoms
   */
  async function loadDenoms() {
    try {
      const res = await client.FandomchainTokenfactoryV_1.query.queryListDenom(undefined as any);
      denoms.value = res.data.denom || [];
    } catch (error) {
      console.error('Error loading denoms:', error);
      showMessage('error', 'Failed to load tokens list');
    }
  }

  /**
   * Load token data including price and progress
   */
  async function loadTokenData() {
    if (!selectedDenom.value) return;

    loading.value = true;
    try {
      // Get denom info
      const denomRes = await client.FandomchainTokenfactoryV_1.query.queryGetDenom(selectedDenom.value);
      tokenData.value = denomRes.data.denom as TokenData;

      // Get price
      const priceRes = await fetch(`${API_BASE_URL}/fandomChain/tokenfactory/v1/bonding_curve_price/${selectedDenom.value}`);
      const priceData = await priceRes.json();
      currentPrice.value = priceData.price || '0';

      // Get progress
      const progressRes = await fetch(`${API_BASE_URL}/fandomChain/tokenfactory/v1/bonding_curve_progress/${selectedDenom.value}`);
      const progressData = await progressRes.json();
      progress.value = progressData.progress || '0';
      tokensSold.value = parseInt(progressData.tokens_sold || '0');
      tokensRemaining.value = parseInt(progressData.tokens_remaining || '0');

      // Load user balances
      await loadUserBalances();
    } catch (error) {
      console.error('Error loading token data:', error);
      showMessage('error', 'Failed to load token data');
    } finally {
      loading.value = false;
    }
  }

  /**
   * Load user balances for FandomChain and selected token
   */
  async function loadUserBalances() {
    if (!address.value) return;

    try {
      const res = await client.CosmosBankV_1Beta_1.query.queryAllBalances(address.value);
      const balances = res.data.balances || [];

      const fandomBalance = balances.find((b: any) => b.denom === 'fandomChain');
      userFandomBalance.value = fandomBalance ? fandomBalance.amount : '0';

      const tokenBalance = balances.find((b: any) => b.denom === selectedDenom.value);
      userTokenBalance.value = tokenBalance ? tokenBalance.amount : '0';
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  }

  /**
   * Estimate buy transaction
   */
  async function estimateBuy() {
    if (!buyAmount.value || buyAmount.value <= 0) {
      buyEstimate.value = null;
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/fandomChain/tokenfactory/v1/estimate_buy/${selectedDenom.value}/${buyAmount.value}`);
      const data = await res.json();
      buyEstimate.value = {
        tokensOut: parseInt(data.tokens_out || '0'),
        priceImpact: data.price_impact || '0',
      };
    } catch (error) {
      console.error('Error estimating buy:', error);
      showMessage('error', 'Failed to estimate buy');
    }
  }

  /**
   * Estimate sell transaction
   */
  async function estimateSell() {
    if (!sellAmount.value || sellAmount.value <= 0) {
      sellEstimate.value = null;
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/fandomChain/tokenfactory/v1/estimate_sell/${selectedDenom.value}/${sellAmount.value}`);
      const data = await res.json();
      sellEstimate.value = {
        fandomOut: parseInt(data.fandom_out || '0'),
        priceImpact: data.price_impact || '0',
      };
    } catch (error) {
      console.error('Error estimating sell:', error);
      showMessage('error', 'Failed to estimate sell');
    }
  }

  /**
   * Execute buy transaction
   */
  async function executeBuy() {
    if (!address.value || !buyAmount.value || !buyEstimate.value) {
      showMessage('error', 'Please connect wallet and enter amount');
      return;
    }

    loading.value = true;
    try {
      const minTokensOut = Math.floor(buyEstimate.value.tokensOut * (1 - buySlippage.value / 100));

      const msg = {
        typeUrl: '/fandomchain.tokenfactory.v1.MsgBuyWithBondingCurve',
        value: {
          buyer: address.value,
          denom: selectedDenom.value,
          fandomAmount: buyAmount.value.toString(),
          minTokensOut: minTokensOut.toString(),
        },
      };

      await client.signAndBroadcast([msg], { amount: [], gas: "200000" }, '');
      showMessage('success', 'Buy transaction successful!');

      // Reset and reload
      buyAmount.value = 0;
      buyEstimate.value = null;
      await loadTokenData();
    } catch (error: any) {
      console.error('Error executing buy:', error);
      showMessage('error', error.message || 'Buy transaction failed');
    } finally {
      loading.value = false;
    }
  }

  /**
   * Execute sell transaction
   */
  async function executeSell() {
    if (!address.value || !sellAmount.value || !sellEstimate.value) {
      showMessage('error', 'Please connect wallet and enter amount');
      return;
    }

    loading.value = true;
    try {
      const minFandomOut = Math.floor(sellEstimate.value.fandomOut * (1 - sellSlippage.value / 100));

      const msg = {
        typeUrl: '/fandomchain.tokenfactory.v1.MsgSellWithBondingCurve',
        value: {
          seller: address.value,
          denom: selectedDenom.value,
          tokenAmount: sellAmount.value.toString(),
          minFandomOut: minFandomOut.toString(),
        },
      };

      await client.signAndBroadcast([msg], { amount: [], gas: "200000" }, '');
      showMessage('success', 'Sell transaction successful!');

      // Reset and reload
      sellAmount.value = 0;
      sellEstimate.value = null;
      await loadTokenData();
    } catch (error: any) {
      console.error('Error executing sell:', error);
      showMessage('error', error.message || 'Sell transaction failed');
    } finally {
      loading.value = false;
    }
  }

  /**
   * Draw bonding curve chart
   */
  function drawChart(canvas: HTMLCanvasElement) {
    if (!canvas || !tokenData.value) return;

    // Destroy existing chart
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Generate bonding curve data points
      const virtualFandom = parseInt(tokenData.value.virtual_fandom_reserves);
      const virtualToken = parseInt(tokenData.value.virtual_token_reserves);
      const k = virtualFandom * virtualToken;

      const dataPoints = [];
      const maxFandom = virtualFandom * 3;

      for (let fandom = 1; fandom <= maxFandom; fandom += Math.floor(maxFandom / 50)) {
        const tokens = k / fandom;
        const price = (fandom * 1000000) / tokens;
        dataPoints.push({ x: fandom, y: price });
      }

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Price (FandomChain per token)',
              data: dataPoints,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Current Position',
              data: [{ x: virtualFandom, y: parseInt(currentPrice.value) }],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgb(239, 68, 68)',
              pointRadius: 8,
              pointHoverRadius: 10,
              showLine: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              type: 'linear',
              title: {
                display: true,
                text: 'FandomChain Reserves',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price',
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error drawing chart:', error);
    }
  }

  /**
   * Cleanup chart instance
   */
  function destroyChart() {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  }

  /**
   * Format number with thousand separators
   */
  function formatNumber(num: number | string): string {
    const n = typeof num === 'string' ? parseInt(num) : num;
    return n.toLocaleString();
  }

  /**
   * Show temporary message
   */
  function showMessage(type: 'error' | 'success', text: string) {
    message.value = { type, text };
    setTimeout(() => {
      message.value = null;
    }, 5000);
  }

  return {
    // State
    selectedDenom,
    denoms,
    tokenData,
    currentPrice,
    progress,
    tokensSold,
    tokensRemaining,
    loading,
    message,
    buyAmount,
    sellAmount,
    buySlippage,
    sellSlippage,
    buyEstimate,
    sellEstimate,
    userFandomBalance,
    userTokenBalance,
    address,

    // Methods
    loadDenoms,
    loadTokenData,
    loadUserBalances,
    estimateBuy,
    estimateSell,
    executeBuy,
    executeSell,
    drawChart,
    destroyChart,
    formatNumber,
    showMessage,
  };
}

