<template>
  <nav class="navbar" :class="{ 'navbar-fixed': isFixed, 'navbar-static': !isFixed }">
    <div class="navbar-container">
      <!-- Mobile hamburger button - left side -->
      <button
        @click="toggleMobileMenu"
        class="hamburger-btn mobile-only"
        :class="{ active: isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar-brand">
        <img src="@/assets/img/logo.svg" alt="Logo" class="logo" />
      </div>

      <!-- Desktop Menu - Centered Categories -->
      <div class="navbar-menu desktop-menu">
        <router-link to="/" class="nav-link">{{ t("navbar.home") }}</router-link>
        <router-link
          v-for="category in activeCategories"
          :key="category.id"
          :to="`/category/${category.id}`"
          class="nav-link"
        >
          {{ category.name }}
        </router-link>
      </div>

      <!-- Desktop Actions -->
      <div class="navbar-actions desktop-actions">
        <el-badge :value="cartItemsCount" :hidden="cartItemsCount === 0" class="cart-badge">
          <el-button circle @click="openCart">
            <el-icon class="text-xl"><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>

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
                {{ t("settings.spanish") }}
              </el-dropdown-item>
              <el-dropdown-item
                v-if="isi18nEnabled"
                command="en"
                :icon="currentLocale === 'en' ? Check : ''"
                :disabled="currentLocale === 'en'"
              >
                {{ t("settings.english") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- Mobile Actions - right side -->
      <div class="mobile-menu-toggle" :class="{ 'menu-open': isMobileMenuOpen }">
        <el-badge
          :value="cartItemsCount"
          :hidden="cartItemsCount === 0"
          class="cart-badge-mobile mobile-icon"
        >
          <el-button circle size="small" @click="openCart">
            <el-icon><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>

        <el-dropdown @command="handleCommand" class="settings-dropdown mobile-icon">
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
                {{ t("settings.spanish") }}
              </el-dropdown-item>
              <el-dropdown-item
                v-if="isi18nEnabled"
                command="en"
                :icon="currentLocale === 'en' ? Check : ''"
                :disabled="currentLocale === 'en'"
              >
                {{ t("settings.english") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <!-- Navegación -->
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
          {{ t("navbar.home") }}
        </router-link>
        <router-link
          v-for="category in activeCategories"
          :key="category.id"
          :to="`/category/${category.id}`"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ category.name }}
        </router-link>

        <!-- Redes sociales -->
        <div class="mobile-social-section">
          <span class="mobile-social-title">Síguenos:</span>
          <div class="mobile-social-icons">
            <a href="#" class="mobile-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a href="#" class="mobile-social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                />
              </svg>
            </a>
            <a href="#" class="mobile-social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a href="#" class="mobile-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Botón de registro -->
        <el-button
          type="primary"
          class="mobile-cta-btn mt-4"
          style="
            background-color: var(--app-secondary-color);
            border-color: var(--app-secondary-color);
          "
          @click="closeMobileMenu"
        >
          Haz parte de nosotros
        </el-button>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useI18n } from "vue-i18n"
import { Setting, Moon, Sunny, Check, ShoppingCart } from "@element-plus/icons-vue"
import { toggleDarkMode, setupElementPlus } from "@/plugins/element-plus"
import { getCurrentInstance } from "vue"
import { ElMessage } from "element-plus"
import features from "@/config/features"
import landingConfig from "@/config/landing.config"

const productsList = [
  {
    id: 1,
    name: "Mascotas",
    description: "Productos de alta calidad para el cuidado de tus mascotas.",
    idEstado: 1,
  },
  {
    id: 2,
    name: "Belleza y salud",
    description: "Productos para el cuidado de tu belleza y salud.",
    idEstado: 1,
  },
  {
    id: 3,
    name: "Accesorios",
    description: "Productos para complementar tu estilo y personalidad.",
    idEstado: 1,
  },
  {
    id: 4,
    name: "Roluna",
    description: "Productos exclusivos de la marca Roluna.",
    idEstado: 1,
  },
]

const { locale, t } = useI18n()
const isDark = ref(false)
const currentLocale = ref("es")
const isMobileMenuOpen = ref(false)
const isDarkModeEnabled = features.darkMode
const isFixed = landingConfig.navbar.sticky || false
const isi18nEnabled = features.translations
const cartItemsCount = ref(0)

const activeCategories = computed(() => {
  return productsList.filter((product) => product.idEstado === 1)
})

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

const emit = defineEmits(["menu-toggle"])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : ""
  emit("menu-toggle", isMobileMenuOpen.value)
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ""
  emit("menu-toggle", false)
}

const openCart = () => {
  ElMessage.info("Carrito de compras")
  // TODO: Implementar funcionalidad del carrito
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
  /* border-bottom: 1px solid var(--el-border-color); */
  /* box-shadow: var(--el-box-shadow-light); */
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
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

/* Desktop Menu - Centered */
.navbar-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1;
}

.desktop-menu {
  display: none;
}

/* Desktop Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.desktop-actions {
  display: none;
}

.cart-badge {
  display: flex;
  align-items: center;
}

.cart-badge-mobile {
  display: flex;
  align-items: center;
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

.mobile-menu-toggle.menu-open .mobile-icon {
  display: none;
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
  position: absolute;
}

.hamburger-btn span:nth-child(1) {
  top: 8px;
}

.hamburger-btn span:nth-child(2) {
  top: 15px;
}

.hamburger-btn span:nth-child(3) {
  top: 22px;
}

.hamburger-btn.active span:nth-child(1) {
  top: 15px;
  transform: rotate(45deg);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  top: 15px;
  transform: rotate(-45deg);
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  z-index: 999;
}

.mobile-nav-link {
  color: var(--el-text-color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  text-align: left;
  display: block;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background-color: var(--el-fill-color-light);
  color: var(--el-color-primary);
}

.mobile-cta-btn {
  width: 100%;
  margin-bottom: 8px;
  font-size: 0.9rem;
  padding: 10px 16px;
}

.mobile-social-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.mobile-social-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  text-align: center;
}

.mobile-social-icons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.mobile-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--el-color-primary);
  color: white;
  transition: all 0.3s ease;
}

.mobile-social-link:hover {
  background: var(--el-color-primary-dark-2);
  transform: translateY(-2px);
}

.mobile-social-link svg {
  width: 16px;
  height: 16px;
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
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

  .desktop-actions {
    display: flex;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .mobile-only {
    display: none !important;
  }

  .brand-name {
    font-size: 1.25rem;
  }

  .navbar-container {
    display: grid;
    grid-template-columns: auto 1fr auto;
  }

  .navbar-brand {
    position: static;
    transform: none;
  }
}

@media (max-width: 767px) {
  .mobile-only {
    display: flex;
  }

  .navbar-container {
    padding: 0 16px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .navbar-brand .logo {
    pointer-events: auto;
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
