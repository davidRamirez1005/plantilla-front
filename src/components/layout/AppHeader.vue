<template>
  <div class="app-header">
    <div class="header-left">
      <el-button v-if="showSidebarToggle" :icon="Expand" circle @click="$emit('toggle-sidebar')" />
      <span class="page-title">{{ pageTitle }}</span>
    </div>

    <div class="header-right">
      <el-button :icon="Bell" circle />
      <el-dropdown @command="handleCommand">
        <div class="user-avatar">
          <el-avatar :size="36" src="https://i.pravatar.cc/150" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Perfil</el-dropdown-item>
            <el-dropdown-item>Configuración</el-dropdown-item>
            <el-dropdown-item divided command="toggleTheme" :icon="isDark ? Sunny : Moon">
              {{ isDark ? t("settings.lightMode") : t("settings.darkMode") }}
            </el-dropdown-item>
            <el-dropdown-item
              command="es"
              :icon="currentLocale === 'es' ? Check : ''"
              :disabled="currentLocale === 'es'"
            >
              Español
            </el-dropdown-item>
            <el-dropdown-item
              command="en"
              :icon="currentLocale === 'en' ? Check : ''"
              :disabled="currentLocale === 'en'"
            >
              English
            </el-dropdown-item>
            <el-dropdown-item divided>Cerrar Sesión</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { Expand, Bell, Moon, Sunny, Check } from "@element-plus/icons-vue"
import { toggleDarkMode, setupElementPlus } from "@/plugins/element-plus"

const { locale, t } = useI18n()
const isDark = ref(false)
const currentLocale = ref("es")

defineProps({
  showSidebarToggle: {
    type: Boolean,
    default: true,
  },
})

onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark"
  currentLocale.value = localStorage.getItem("locale") || "es"
  locale.value = currentLocale.value

  if (isDark.value) {
    toggleDarkMode(true)
  }
})

const handleCommand = (command) => {
  if (command === "toggleTheme") {
    isDark.value = !isDark.value
    localStorage.setItem("theme", isDark.value ? "dark" : "light")
    toggleDarkMode(isDark.value)
  } else if (command === "es" || command === "en") {
    currentLocale.value = command
    locale.value = command
    localStorage.setItem("locale", command)

    const app = getCurrentInstance()
    if (app) {
      setupElementPlus(app.appContext.app)
    }
  }
}

defineEmits(["toggle-sidebar"])

const route = useRoute()
const pageTitle = computed(() => route.meta.title || "Dashboard")
</script>

<style scoped>
.app-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--el-bg-color);
  padding: 0 20px;
  transition: background-color 0.3s;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  cursor: pointer;
}
</style>
