<template>
  <el-container class="default-layout">
    <el-aside :width="sidebarWidth" v-if="showSidebar">
      <AppSidebar :collapsed="sidebarCollapsed" />
    </el-aside>

    <el-container direction="vertical">
      <el-header height="60px">
        <AppHeader @toggle-sidebar="toggleSidebar" :show-sidebar-toggle="showSidebar" />
      </el-header>

      <el-main>
        <div class="breadcrumb-container" v-if="isBreadcrumbEnabled">
          <Breadcrumb />
        </div>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from "vue"
import AppSidebar from "@/components/layout/AppSidebar.vue"
import AppHeader from "@/components/layout/AppHeader.vue"
import Breadcrumb from "@/components/ui/Breadcrumb.vue"
import features from "@/config/dashboard.config"

const sidebarCollapsed = ref(false)
const showSidebar = ref(true)
const isBreadcrumbEnabled = ref(features.config.breadCrumb)

const sidebarWidth = computed(() => (sidebarCollapsed.value ? "64px" : "250px"))

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<style scoped>
.default-layout {
  height: 100vh;
}

.el-aside {
  background-color: var(--background-color-sidebar);
  transition: width 0.3s;
}

.el-header {
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.el-main {
  padding: 20px;
}

.breadcrumb-container {
  margin-bottom: 20px;
  padding: 12px 0;
}
</style>
