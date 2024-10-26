import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BuilderView from "../views/BuilderView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/build",
      name: "build",
      component: BuilderView,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;
