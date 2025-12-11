import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'

import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: AuthLayout } 
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { layout: AuthLayout } 
    },
    {
      path: '/info-user',
      name: 'info-user',
      component: () => import('@/views/InfoUserView.vue'),
      meta: { layout: AuthLayout }
    },
    {
      path: '/info-restaurant',
      name: 'info-restaurant',
      component: () => import('@/views/InfoRestaurantView.vue'),
      meta: { layout: AuthLayout } 
    },
    
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { layout: MainLayout } 
    },
  ],
})

router.beforeEach(() => {
  nProgress.start();
})

router.afterEach(() => {
  nProgress.done();
})

export default router