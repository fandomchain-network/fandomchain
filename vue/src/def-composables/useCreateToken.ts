import { ref } from 'vue';
import { useClient } from '../composables/useClient';
import { useAddress } from './useAddress';

export interface CreateTokenForm {
  denom: string;
  description: string;
  ticker: string;
  url: string;
}

export interface Message {
  type: 'error' | 'success';
  text: string;
}

export function useCreateToken() {
  const client = useClient();
  const { address } = useAddress();

  // Form state
  const form = ref<CreateTokenForm>({
    denom: '',
    description: '',
    ticker: '',
    url: '',
  });

  // UI state
  const loading = ref(false);
  const message = ref<Message | null>(null);
  const createdToken = ref<string | null>(null);

  /**
   * Show message to user
   */
  function showMessage(type: 'error' | 'success', text: string) {
    message.value = { type, text };
    setTimeout(() => {
      message.value = null;
    }, 5000);
  }

  /**
   * Validate form
   */
  function validateForm(): { valid: boolean; error?: string } {
    if (!form.value.denom || form.value.denom.trim() === '') {
      return { valid: false, error: 'Denom is required' };
    }

    if (!form.value.ticker || form.value.ticker.trim() === '') {
      return { valid: false, error: 'Ticker is required' };
    }

    if (!form.value.description || form.value.description.trim() === '') {
      return { valid: false, error: 'Description is required' };
    }

    // Validate denom format (lowercase alphanumeric)
    const denomRegex = /^[a-z0-9]+$/;
    if (!denomRegex.test(form.value.denom)) {
      return {
        valid: false,
        error: 'Denom must contain only lowercase letters and numbers'
      };
    }

    // Validate ticker format (uppercase alphanumeric)
    const tickerRegex = /^[A-Z0-9]+$/;
    if (!tickerRegex.test(form.value.ticker)) {
      return {
        valid: false,
        error: 'Ticker must contain only uppercase letters and numbers'
      };
    }

    // Validate URL format if provided
    if (form.value.url && form.value.url.trim() !== '') {
      try {
        new URL(form.value.url);
      } catch {
        return { valid: false, error: 'Invalid URL format' };
      }
    }

    return { valid: true };
  }

  /**
   * Create a new token
   */
  async function createToken() {
    if (!address.value) {
      showMessage('error', 'Please connect your wallet first');
      return;
    }

    // Validate form
    const validation = validateForm();
    if (!validation.valid) {
      showMessage('error', validation.error || 'Invalid form data');
      return;
    }

    loading.value = true;
    try {
      const msgCreateDenom = {
        typeUrl: '/fandomChain.tokenfactory.MsgCreateDenom',
        value: {
          owner: address.value,
          denom: form.value.denom,
          description: form.value.description,
          ticker: form.value.ticker,
          url: form.value.url || '',
        },
      };

      const fee = {
        amount: [{ denom: 'ufandomChain', amount: '5000' }],
        gas: '200000',
      };

      const result = await client.FandomchainTokenfactoryV_1.tx.sendMsgCreateDenom({
        value: msgCreateDenom.value,
        fee,
        memo: '',
      });

      if (result) {
        createdToken.value = form.value.denom;
        showMessage('success', `Token "${form.value.ticker}" created successfully!`);

        // Reset form
        form.value = {
          denom: '',
          description: '',
          ticker: '',
          url: '',
        };
      }
    } catch (error: any) {
      console.error('Error creating token:', error);
      const errorMessage = error?.message || 'Failed to create token';
      showMessage('error', errorMessage);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Reset form
   */
  function resetForm() {
    form.value = {
      denom: '',
      description: '',
      ticker: '',
      url: '',
    };
    createdToken.value = null;
    message.value = null;
  }

  return {
    // State
    form,
    loading,
    message,
    createdToken,
    address,

    // Methods
    createToken,
    resetForm,
    validateForm,
  };
}
