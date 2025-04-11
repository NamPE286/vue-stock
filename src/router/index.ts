import { createRouter, createWebHistory } from "vue-router/auto";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}
