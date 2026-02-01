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
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
    >
      <el-menu-item index="/dashboard">
        <el-icon><HomeFilled /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>

      <el-menu-item index="/users">
        <el-icon><User /></el-icon>
        <span>Usuarios</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeFilled, User } from '@element-plus/icons-vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const appTitle = import.meta.env.VITE_APP_TITLE || 'Mi App'
const route = useRoute()
const activeMenu = computed(() => route.path)
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
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
}

.el-menu {
  border-right: none;
  flex: 1;
}
</style>
