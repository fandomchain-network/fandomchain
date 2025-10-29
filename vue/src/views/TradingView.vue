<template>
  <div class="trading-view">
    <div class="container mx-auto px-4 py-8">
      <!-- Token Selector -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-4">Token Trading</h1>
        <div class="flex gap-4 items-center">
          <select
            v-model="selectedDenom"
            class="px-4 py-2 border rounded-lg"
            @change="handleLoadTokenData"
          >
            <option value="">Select a token...</option>
            <option v-for="denom in denoms" :key="denom.denom" :value="denom.denom">
              {{ denom.ticker }} - {{ denom.denom }}
            </option>
          </select>

          <button
            @click="handleLoadTokenData"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            :disabled="!selectedDenom || loading"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>

      <LoadingSpinner v-if="loading && !tokenData" message="Loading token data..." />
      <div v-else-if="selectedDenom && tokenData" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Token Info & Chart -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Token Information Card -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 class="text-2xl font-bold mb-4">{{ tokenData.ticker }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p class="text-sm text-gray-400">Current Price</p>
                <p class="text-xl font-bold">{{ currentPrice }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Progress</p>
                <p class="text-xl font-bold">{{ progress }}%</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Tokens Sold</p>
                <p class="text-xl font-bold">{{ formatNumber(tokensSold) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Tokens Remaining</p>
                <p class="text-xl font-bold">{{ formatNumber(tokensRemaining) }}</p>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="mt-4">
              <div class="w-full bg-gray-700 rounded-full h-4">
                <div 
                  class="bg-blue-500 h-4 rounded-full transition-all duration-500" 
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Bonding Curve Chart -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 class="text-xl font-bold mb-4">Bonding Curve</h3>
            <canvas ref="chartCanvas" class="w-full" style="max-height: 400px;"></canvas>
          </div>
        </div>

        <!-- Right Column: Buy/Sell Forms -->
        <div class="space-y-6">
          <!-- Buy Card -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 class="text-xl font-bold mb-4 text-green-600">Buy Tokens</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">FandomChain Amount</label>
                <input 
                  v-model.number="buyAmount" 
                  type="number" 
                  placeholder="0" 
                  class="w-full px-4 py-2 border rounded-lg"
                  @input="estimateBuy"
                />
              </div>
              
              <div v-if="buyEstimate" class="bg-blue-900/30 p-4 rounded-lg border border-blue-700/50">
                <p class="text-sm text-gray-300">You will receive (estimated):</p>
                <p class="text-2xl font-bold">{{ formatNumber(buyEstimate.tokensOut) }} tokens</p>
                <p class="text-sm text-gray-400 mt-2">Price impact: {{ buyEstimate.priceImpact }}%</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Slippage Tolerance (%)</label>
                <input 
                  v-model.number="buySlippage" 
                  type="number" 
                  placeholder="2" 
                  class="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <button
                @click="executeBuy"
                class="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!buyAmount || buyAmount <= 0 || loading"
              >
                <svg
                  v-if="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ loading ? 'Processing Transaction...' : 'Buy Tokens' }}
              </button>
            </div>
          </div>

          <!-- Sell Card -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 class="text-xl font-bold mb-4 text-red-600">Sell Tokens</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Token Amount</label>
                <input 
                  v-model.number="sellAmount" 
                  type="number" 
                  placeholder="0" 
                  class="w-full px-4 py-2 border rounded-lg"
                  @input="estimateSell"
                />
                <p class="text-sm text-gray-400 mt-1">Balance: {{ userTokenBalance }}</p>
              </div>
              
              <div v-if="sellEstimate" class="bg-blue-900/30 p-4 rounded-lg border border-blue-700/50">
                <p class="text-sm text-gray-300">You will receive (estimated):</p>
                <p class="text-2xl font-bold">{{ formatNumber(sellEstimate.fandomOut) }} FandomChain</p>
                <p class="text-sm text-gray-400 mt-2">Price impact: {{ sellEstimate.priceImpact }}%</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Slippage Tolerance (%)</label>
                <input 
                  v-model.number="sellSlippage" 
                  type="number" 
                  placeholder="2" 
                  class="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <button
                @click="executeSell"
                class="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!sellAmount || sellAmount <= 0 || loading"
              >
                <svg
                  v-if="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ loading ? 'Processing Transaction...' : 'Sell Tokens' }}
              </button>
            </div>
          </div>

          <!-- User Balances -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 class="text-xl font-bold mb-4">Your Balances</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>FandomChain:</span>
                <span class="font-bold">{{ userFandomBalance }}</span>
              </div>
              <div class="flex justify-between">
                <span>{{ tokenData?.ticker }}:</span>
                <span class="font-bold">{{ userTokenBalance }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div v-if="message" class="fixed bottom-4 right-4 max-w-md">
        <div 
          :class="[
            'p-4 rounded-lg shadow-lg',
            message.type === 'error' ? 'bg-red-500' : 'bg-green-500',
            'text-white'
          ]"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useTradingView } from '../def-composables/useTradingView';
import LoadingSpinner from '../components/LoadingSpinner.vue';

// Use composable
const {
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
} = useTradingView();

// Chart canvas ref
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Handle token data loading with chart update
async function handleLoadTokenData() {
  await loadTokenData();
  await nextTick();
  if (chartCanvas.value) {
    drawChart(chartCanvas.value);
  }
}

// Lifecycle
onMounted(() => {
  loadDenoms();
});

onUnmounted(() => {
  destroyChart();
});

watch(address, () => {
  if (selectedDenom.value) {
    loadUserBalances();
  }
});
</script>

<style scoped>
.trading-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  color: white;
}

input:disabled,
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="number"],
select {
  background-color: #1e293b;
  color: white;
  border-color: #475569;
}

input[type="number"]:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
}
</style>

