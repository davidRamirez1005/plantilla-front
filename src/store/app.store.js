import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const darkMode = ref(false)
  const sidebarCollapsed = ref(false)

  function setLoading(value) {
    loading.value = value
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark')
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    loading,
    darkMode,
    sidebarCollapsed,
    setLoading,
    toggleDarkMode,
    toggleSidebar,
  }
})
