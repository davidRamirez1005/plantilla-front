import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import esLocale from "element-plus/es/locale/lang/es.mjs"
import enLocale from "element-plus/es/locale/lang/en.mjs"

export function setupElementPlus(app) {
  const userLocale = localStorage.getItem("locale") || "es"
  const locale = userLocale === "en" ? enLocale : esLocale

  app.use(ElementPlus, {
    locale,
    size: "default", // 'large' | 'default' | 'small'
    zIndex: 3000, // z-index inicial para modales/popups
    button: {
      autoInsertSpace: true, // Auto espaciado en botones
    },
  })

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

/**
 * Configuración personalizada de tema
 */
export const elementPlusTheme = {
  "--el-color-primary": "#409eff",
  "--el-color-success": "#67c23a",
  "--el-color-warning": "#e6a23c",
  "--el-color-danger": "#f56c6c",
  "--el-color-error": "#f56c6c",
  "--el-color-info": "#909399",

  "--el-font-size-base": "14px",
  "--el-border-radius-base": "4px",

  "--el-padding-base": "12px 20px",
}

/**
 * Aplicar tema personalizado
 */
export function applyElementPlusTheme() {
  const root = document.documentElement
  Object.entries(elementPlusTheme).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

/**
 * Configuración global de mensajes
 */
export const messageConfig = {
  duration: 3000,
  showClose: true,
  grouping: true, // Agrupar mensajes similares
  offset: 20,
}

/**
 * Configuración global de notificaciones
 */
export const notificationConfig = {
  duration: 4000,
  position: "top-right",
  showClose: true,
  offset: 20,
}

/**
 * Configuración global de diálogos
 */
export const dialogConfig = {
  width: "500px",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  draggable: true,
  center: false,
}

/**
 * Configuración de tabla
 */
export const tableConfig = {
  border: false,
  stripe: true, // Filas zebradas
  size: "default",
  emptyText: "No hay datos",
  highlightCurrentRow: true,
}

/**
 * Configuración de paginación
 */
export const paginationConfig = {
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  small: false,
}

// Función para alternar el modo oscuro
export function toggleDarkMode(isDark) {
  const html = document.documentElement

  if (isDark) {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
}

export default {
  setupElementPlus,
  applyElementPlusTheme,
  messageConfig,
  notificationConfig,
  dialogConfig,
  tableConfig,
  paginationConfig,
  toggleDarkMode,
}
