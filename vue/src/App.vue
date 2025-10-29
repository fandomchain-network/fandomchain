<script setup lang="ts">
import { RouterView } from "vue-router";

import IgntHeader from "./components/IgntHeader.vue";

const items = [
  {
    label: "Portfolio",
    to: "/",
  },
  {
    label: "Create Token",
    to: "/create-token",
  },
  {
    label: "Trading",
    to: "/trading",
  },
  {
    label: "Data",
    to: "/data",
  },
];
</script>

<template>
  <IgntHeader :nav-items="items"></IgntHeader>
  <main id="main-content">
    <RouterView />
  </main>
</template>
