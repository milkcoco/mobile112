import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/english',
      name: 'english',
      // component: EnglishDB
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/EnglishDB.vue')
    },
    {
      path: '/chemistry',
      name: 'chemistry',
      component: () => import('./components/ChineseDB.vue')
    },
    {
      path: '/chemistry-radio',
      name: 'chemistry radio',
      component: () => import('./components/BiologyDB.vue')
    }
  ]
})

export default router