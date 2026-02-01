import { createPinia } from 'pinia'
export const pinia = createPinia()

export { useAppStore } from './app.store'

export const useAuthStore = () => {
  try {
    return require('@/modules/auth/store/auth.store').useAuthStore()
  } catch {
    return null
  }
}
