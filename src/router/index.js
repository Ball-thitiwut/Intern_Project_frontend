import { createRouter, createWebHistory } from "vue-router";
import nProgress from "nprogress";

import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import MainDashboard from "@/views/MainDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { layout: AuthLayout },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignupView.vue"),
      meta: { layout: AuthLayout },
    },
    {
      path: "/info-user",
      name: "info-user",
      component: () => import("@/views/InfoUserView.vue"),
      meta: { layout: AuthLayout },
    },
    {
      path: "/info-restaurant",
      name: "info-restaurant",
      component: () => import("@/views/InfoRestaurantView.vue"),
      meta: { layout: AuthLayout },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: MainDashboard,
      meta: { layout: MainLayout },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: { layout: MainLayout },
    },
    {
      path: "/pos-info",
      name: "pos-info",
      component: () => import("@/views/PosView.vue"),
      meta: { layout: MainLayout },
    },
    {
      path: "/select-pos",
      name: "select-pos",
      component: () => import("@/views/SelectPosView.vue"),
      meta: { layout: MainLayout },
    },
    {
      path: "/branch-connect",
      name: "branch-connect",
      component: () => import("@/views/BranchConnectView.vue"),
      meta: { layout: MainLayout },
    },
    {
      path: "/menu-pairing",
      name: "menu-pairing",
      component: () => import("@/views/MenuPairView.vue"),
      meta: { layout: MainLayout },
    },
    {
      path: "/ideas",
      name: "ideas",
      component: () => import("@/views/IdeasView.vue"),
      meta: { layout: MainLayout },
    },
  ],
});

router.beforeEach(() => {
  nProgress.start();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
