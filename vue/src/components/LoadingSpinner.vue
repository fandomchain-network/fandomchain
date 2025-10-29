<template>
  <div class="flex items-center justify-center p-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span v-if="message" class="ml-4 text-gray-400">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>
