<template>
  <div class="create-token-view">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">Create Your Token</h1>
          <p class="text-gray-400">
            Launch your own token with an automated bonding curve on FandomChain
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="createdToken"
          class="mb-8 bg-green-900/30 backdrop-blur-sm rounded-lg p-6 border border-green-700"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-green-400">Token Created Successfully!</h3>
              <p class="mt-2 text-sm text-green-300">
                Your token "{{ createdToken }}" has been created with a bonding curve.
              </p>
              <div class="mt-4">
                <router-link
                  to="/trading"
                  class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
                >
                  Start Trading
                  <svg
                    class="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </router-link>
                <button
                  @click="resetForm"
                  class="ml-3 inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
                >
                  Create Another Token
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Form Card -->
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
          <!-- Bonding Curve Info Banner -->
          <div class="bg-blue-900/30 border-b border-blue-700/50 p-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-400">Automated Bonding Curve</h3>
                <div class="mt-2 text-sm text-blue-300">
                  <ul class="list-disc list-inside space-y-1">
                    <li>Initial supply: 800,000 tokens</li>
                    <li>Starting price: ~30 FandomChain for full supply</li>
                    <li>Trading fees: 1% on buy and sell</li>
                    <li>Price increases as tokens are bought</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="createToken" class="p-6 space-y-6">
            <!-- Denom -->
            <div>
              <label for="denom" class="block text-sm font-medium mb-2">
                Denom <span class="text-red-500">*</span>
              </label>
              <input
                id="denom"
                v-model="form.denom"
                type="text"
                placeholder="e.g., streamercoin"
                class="w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                :disabled="loading"
                required
              />
              <p class="mt-1 text-xs text-gray-400">
                Unique identifier for your token (lowercase letters and numbers only)
              </p>
            </div>

            <!-- Ticker -->
            <div>
              <label for="ticker" class="block text-sm font-medium mb-2">
                Ticker <span class="text-red-500">*</span>
              </label>
              <input
                id="ticker"
                v-model="form.ticker"
                type="text"
                placeholder="e.g., STREAM"
                class="w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                :disabled="loading"
                maxlength="10"
                required
              />
              <p class="mt-1 text-xs text-gray-400">
                Trading symbol for your token (uppercase letters and numbers only, max 10 characters)
              </p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium mb-2">
                Description <span class="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                placeholder="Describe your token and its purpose..."
                class="w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                :disabled="loading"
                required
              ></textarea>
              <p class="mt-1 text-xs text-gray-400">
                Tell your community what this token represents
              </p>
            </div>

            <!-- URL -->
            <div>
              <label for="url" class="block text-sm font-medium mb-2">
                URL <span class="text-gray-500">(optional)</span>
              </label>
              <input
                id="url"
                v-model="form.url"
                type="url"
                placeholder="https://example.com"
                class="w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                :disabled="loading"
              />
              <p class="mt-1 text-xs text-gray-400">
                Link to your website, stream, or social media
              </p>
            </div>

            <!-- Wallet Info -->
            <div
              v-if="!address"
              class="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4"
            >
              <div class="flex items-start">
                <svg
                  class="h-5 w-5 text-yellow-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-yellow-300">
                    Please connect your wallet to create a token
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-400">Connected Wallet</p>
                  <p class="text-sm font-mono mt-1">{{ formatAddress(address) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-400">Creation Fee</p>
                  <p class="text-sm font-bold mt-1">~0.005 FANDOM</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex gap-4">
              <button
                type="submit"
                class="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                :disabled="loading || !address"
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
                {{ loading ? 'Creating Token...' : 'Create Token' }}
              </button>

              <button
                v-if="!loading"
                type="button"
                @click="resetForm"
                class="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <!-- Info Cards -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div class="text-blue-400 mb-2">
              <svg
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="font-bold mb-1">Instant Launch</h3>
            <p class="text-sm text-gray-400">
              Your token goes live immediately with automated trading
            </p>
          </div>

          <div class="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div class="text-green-400 mb-2">
              <svg
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 class="font-bold mb-1">Fair Launch</h3>
            <p class="text-sm text-gray-400">
              Bonding curve ensures fair price discovery for all participants
            </p>
          </div>

          <div class="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div class="text-purple-400 mb-2">
              <svg
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 class="font-bold mb-1">Secure</h3>
            <p class="text-sm text-gray-400">
              Built on Cosmos SDK with battle-tested security
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error/Success Messages Toast -->
    <div v-if="message" class="fixed bottom-4 right-4 max-w-md z-50">
      <div
        :class="[
          'p-4 rounded-lg shadow-lg backdrop-blur-sm',
          message.type === 'error'
            ? 'bg-red-500/90 border border-red-600'
            : 'bg-green-500/90 border border-green-600',
          'text-white',
        ]"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              v-if="message.type === 'error'"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ message.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateToken } from '../def-composables/useCreateToken';

const {
  // State
  form,
  loading,
  message,
  createdToken,
  address,

  // Methods
  createToken,
  resetForm,
} = useCreateToken();

/**
 * Format address for display
 */
function formatAddress(addr: string): string {
  if (!addr) return '';
  return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
}
</script>

<style scoped>
.create-token-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  color: white;
}

input:disabled,
textarea:disabled,
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type='text'],
input[type='url'],
textarea {
  background-color: #1e293b;
  color: white;
}

input[type='text']:focus,
input[type='url']:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
