import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/account/profile.vue')
    },
    {
      path: '/physics',
      name: 'physics',
      component: () => import('./components/PhysicsDB.vue')
    },
    {
      path: '/chemical',
      name: 'chemical',
      component: () => import('./components/ChemicalDB.vue')
    },
    {
      path: '/biology',
      name: 'biology',
      component: () => import('./components/BiologyDB.vue')
    },
    {
      path: '/geology',
      name: 'geology',
      component: () => import('./components/GeologyDB.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./components/account/account.vue')
    }
  ]
})

export default router