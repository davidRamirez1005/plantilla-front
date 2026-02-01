<template>
  <nav class="navbar" :class="{ 'navbar-fixed': isFixed, 'navbar-static': !isFixed }">
    <div class="navbar-container">
      <div class="navbar-brand">
        <img src="@/assets/img/logo.svg" alt="Logo" class="logo" />
        <span class="brand-name">{{ appTitle }}</span>
      </div>

      <!-- Desktop Menu -->
      <div class="navbar-menu desktop-menu">
        <router-link to="/" class="nav-link">{{ t("navbar.home") }}</router-link>
        <router-link to="/about" class="nav-link">{{ t("navbar.about") }}</router-link>
        <router-link to="/contact" class="nav-link">{{ t("navbar.contact") }}</router-link>
        <el-button type="primary">{{ t("navbar.start") }}</el-button>

        <div class="flex items-center">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-icon class="text-xl"><Setting /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-if="isDarkModeEnabled"
                  command="toggleTheme"
                  :icon="isDark ? Sunny : Moon"
                >
                  {{ isDark ? t("settings.lightMode") : t("settings.darkMode") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="isi18nEnabled"
                  divided
                  command="es"
                  :icon="currentLocale === 'es' ? Check : ''"
                  :disabled="currentLocale === 'es'"
                >
                  Español
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="isi18nEnabled"
                  command="en"
                  :icon="currentLocale === 'en' ? Check : ''"
                  :disabled="currentLocale === 'en'"
                >
                  English
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <div class="mobile-menu-toggle">
        <el-dropdown @command="handleCommand" class="settings-dropdown">
          <span class="el-dropdown-link">
            <el-icon class="text-xl"><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu v-if="isDarkModeEnabled">
              <el-dropdown-item command="toggleTheme" :icon="isDark ? Sunny : Moon">
                {{ isDark ? t("settings.lightMode") : t("settings.darkMode") }}
              </el-dropdown-item>
              <el-dropdown-item
                v-if="isi18nEnabled"
                divided
                command="es"
                :icon="currentLocale === 'es' ? Check : ''"
                :disabled="currentLocale === 'es'"
              >
                Español
              </el-dropdown-item>
              <el-dropdown-item
                v-if="isi18nEnabled"
                command="en"
                :icon="currentLocale === 'en' ? Check : ''"
                :disabled="currentLocale === 'en'"
              >
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <button
          @click="toggleMobileMenu"
          class="hamburger-btn"
          :class="{ active: isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
          {{ t("navbar.home") }}
        </router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
          {{ t("navbar.about") }}
        </router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">
          {{ t("navbar.contact") }}
        </router-link>
        <el-button type="primary" class="mobile-cta-btn" @click="closeMobileMenu">
          {{ t("navbar.start") }}
        </el-button>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useI18n } from "vue-i18n"
import { Setting, Moon, Sunny, Check } from "@element-plus/icons-vue"
import { toggleDarkMode, setupElementPlus } from "@/plugins/element-plus"
import { getCurrentInstance } from "vue"
import features from "@/config/features"
import landingConfig from "@/config/landing.config"

const appTitle = import.meta.env.VITE_APP_TITLE || "Mi App"
const { locale, t } = useI18n()
const isDark = ref(false)
const currentLocale = ref("es")
const isMobileMenuOpen = ref(false)
const isDarkModeEnabled = features.darkMode
const isFixed = landingConfig.navbar.sticky || false
const isi18nEnabled = features.translations

onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark"
  currentLocale.value = localStorage.getItem("locale") || "es"
  locale.value = currentLocale.value

  if (isDark.value) {
    toggleDarkMode(true)
  }

  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : ""
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ""
}

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
</script>

<style scoped>
.navbar {
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-light);
  z-index: 1000;
  transition: all 0.3s;
}

.navbar-fixed {
  position: sticky;
  top: 0;
}

.navbar-static {
  position: relative;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1001;
}

.logo {
  width: 40px;
  height: 40px;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--el-text-color-primary);
  transition: color 0.3s;
}

/* Desktop Menu */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.desktop-menu {
  display: none;
}

.nav-link {
  color: var(--el-text-color-regular);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--el-color-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--el-color-primary);
}

.nav-link.router-link-active {
  color: var(--el-color-primary);
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-text-color-regular);
  transition: color 0.2s;
  cursor: pointer;
}

.el-dropdown-link:hover {
  color: var(--el-color-primary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1001;
}

.settings-dropdown {
  display: flex;
  align-items: center;
}

.hamburger-btn {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.hamburger-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--el-text-color-primary);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger-btn.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 64px;
  right: 0;
  width: 280px;
  max-width: 85vw;
  height: calc(100vh - 64px);
  background-color: var(--el-bg-color);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  z-index: 999;
}

.mobile-nav-link {
  color: var(--el-text-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  text-align: left;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background-color: var(--el-fill-color-light);
  color: var(--el-color-primary);
}

.mobile-cta-btn {
  margin-top: 8px;
  width: 100%;
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(2px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .brand-name {
    font-size: 1.25rem;
  }
}

@media (max-width: 767px) {
  .navbar-container {
    padding: 0 16px;
    height: 64px;
  }

  .logo {
    width: 36px;
    height: 36px;
  }

  .brand-name {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 12px;
  }

  .brand-name {
    font-size: 1rem;
  }

  .mobile-menu {
    width: 100vw;
    max-width: 100vw;
  }
}

/* Tablet optimizations */
@media (min-width: 768px) and (max-width: 1024px) {
  .navbar-container {
    padding: 0 24px;
  }

  .navbar-menu {
    gap: 16px;
  }

  .nav-link {
    font-size: 0.95rem;
  }
}
</style>
