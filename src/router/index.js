import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/week1',
      component: () => import('../views/Week1View.vue')
    },
    {
      path: '/week2',
      component: () => import('../views/Week2View.vue')
    },
    {
      path: '/week3',
      component: () => import('../views/Week3View.vue')
    }
  ]
})

export default router
