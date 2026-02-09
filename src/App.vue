<template>
  <Suspense>
    <template #default>
      <component v-if="routerReady && currentLayout" :is="currentLayout">
        <router-view />
      </component>
      <div v-else class="app-loading">
        <el-icon class="loading-icon" :size="50">
          <Loading />
        </el-icon>
      </div>
    </template>
    <template #fallback>
      <div class="app-loading">
        <el-icon class="loading-icon" :size="50">
          <Loading />
        </el-icon>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { computed, markRaw, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Loading } from "@element-plus/icons-vue"

import DefaultLayout from "@/layouts/DefaultLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"
import LandingLayout from "@/layouts/LandingLayout.vue"

const route = useRoute()
const router = useRouter()
const routerReady = ref(false)

const layouts = {
  default: markRaw(DefaultLayout),
  empty: markRaw(EmptyLayout),
  auth: markRaw(AuthLayout),
  landing: markRaw(LandingLayout),
}

onMounted(async () => {
  await router.isReady()
  routerReady.value = true
})

const currentLayout = computed(() => {
  if (!routerReady.value || !route.meta.layout) {
    return null
  }
  const layoutName = route.meta.layout
  return layouts[layoutName] || layouts.default
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
