import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BuilderView from "../views/BuilderView.vue";
import LoginView from "../views/LoginView.vue";
import SavedResumeView from "@/views/SavedResumeView.vue";
import MyInfoView from "@/views/MyInfoView.vue";


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
      path:"/build/saved", // this is a route for saved resumes, should probably be changed later
      name: "saved",
      component: SavedResumeView,
      props: true,
    },
    {
      path: "/myInfo",
      name: "myInfo",
      component: MyInfoView,
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
