import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import features from '@/config/features'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

if (features.auth) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth
    const token = localStorage.getItem('token')

    if (requiresAuth && !token) {
      next('/login')
    } else if (to.path === '/login' && token) {
      next('/dashboard')
    } else {
      next()
    }
  })
}

export default router
