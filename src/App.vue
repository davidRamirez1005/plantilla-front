<template>
  <Suspense>
    <template #default>
      <component :is="currentLayout">
        <router-view />
      </component>
    </template>
    <template #fallback>
      <div class="app-loading">
        <el-icon class="loading-icon" :size="50">
          <Loading />
        </el-icon>
        <p>Cargando...</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { computed, markRaw } from "vue"
import { useRoute } from "vue-router"
import { Loading } from "@element-plus/icons-vue"

import DefaultLayout from "@/layouts/DefaultLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"
import LandingLayout from "@/layouts/LandingLayout.vue"

const route = useRoute()

const layouts = {
  default: markRaw(DefaultLayout),
  empty: markRaw(EmptyLayout),
  auth: markRaw(AuthLayout),
  landing: markRaw(LandingLayout),
}

const currentLayout = computed(() => {
  const layoutName = route.meta.layout || "landing" // Cambiado de 'default' a 'landing'
  return layouts[layoutName] || layouts.landing // Fallback a landing
})
</script>

<style scoped>
.app-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--el-bg-color);
  color: var(--el-text-color-primary);
}

.loading-icon {
  animation: rotate 1.5s linear infinite;
  color: var(--el-color-primary);
  margin-bottom: 16px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
