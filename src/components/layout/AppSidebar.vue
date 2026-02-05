<template>
  <div class="app-sidebar">
    <div class="sidebar-header">
      <img v-if="!collapsed" src="@/assets/img/logo.svg" alt="Logo" class="logo" />
      <span v-if="!collapsed" class="brand-name">{{ appTitle }}</span>
    </div>

    <el-menu
      :collapse="collapsed"
      :default-active="activeMenu"
      router
      background-color="var(--background-color-sidebar)"
      text-color="var(--text-color)"
      active-text-color="var(--active-text-color)"
    >
      <template v-for="item in visibleMenuItems" :key="item.index">
        <!-- Item con hijos (submenú) -->
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.index">
          <template #title>
            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
            <span>{{ child.label }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- Item sin hijos -->
        <el-menu-item v-else :index="item.index">
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { getVisibleMenuItems } from "@/router/menu.config"

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const appTitle = import.meta.env.VITE_APP_TITLE || "Mi App"
const route = useRoute()
const activeMenu = computed(() => route.path)

const visibleMenuItems = computed(() => getVisibleMenuItems())
</script>

<style scoped>
.app-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 32px;
  height: 32px;
}

.brand-name {
  color: var(--app-bg-primary);
  font-weight: 600;
  font-size: 1.125rem;
}

.el-menu {
  border-right: none;
  flex: 1;
}
</style>
