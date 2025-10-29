import { createRouter, createWebHistory } from "vue-router";

import DataView from "../views/DataView.vue";
import PortfolioView from "../views/PortfolioView.vue";
import TradingView from "../views/TradingView.vue";
import CreateTokenView from "../views/CreateTokenView.vue";

const routerHistory = createWebHistory();
const routes = [
  { path: "/", component: PortfolioView },
  { path: "/data", component: DataView },
  { path: "/trading", component: TradingView },
  { path: "/create-token", component: CreateTokenView },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
