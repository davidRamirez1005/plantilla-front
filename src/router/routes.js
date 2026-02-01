import features from '@/config/features'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/modules/home/pages/HomePage.vue'),
    meta: { layout: 'landing' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/modules/home/pages/NotFoundPage.vue'),
    meta: { layout: 'empty' },
  },
]

if (features.auth) {
  routes.push({
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/LoginPage.vue'),
    meta: { layout: 'auth' },
  })
}

if (features.modules.dashboard) {
  routes.push({
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/modules/dashboard/pages/DashboardPage.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  })
}

export default routes
