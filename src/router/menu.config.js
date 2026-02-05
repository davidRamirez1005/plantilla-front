import { HomeFilled, User, ShoppingCart, Setting, Document } from "@element-plus/icons-vue"
import features from "@config/dashboard.config.js"

/**
 * Configuración del menú del sidebar
 *
 * Estructura:
 * - index: ruta del menu item
 * - label: texto a mostrar
 * - icon: componente de icono de Element Plus
 * - children: array de items hijos (submenú)
 * - visible: función que determina si el item debe mostrarse
 */
const menuConfig = [
  {
    index: "/dashboard",
    label: "Dashboard",
    icon: HomeFilled,
    visible: () => true,
  },
  {
    index: "/users",
    label: "Usuarios",
    icon: User,
    visible: () => features.dashboard.users,
    children: [
      {
        index: "/users/list",
        label: "Lista de Usuarios",
      },
      {
        index: "/users/roles",
        label: "Roles y Permisos",
      },
    ],
  },
  {
    index: "/products",
    label: "Productos",
    icon: ShoppingCart,
    visible: () => features.dashboard.sales,
    children: [
      {
        index: "/products/list",
        label: "Lista de Productos",
      },
      {
        index: "/products/categories",
        label: "Categorías",
      },
      {
        index: "/products/inventory",
        label: "Inventario",
      },
    ],
  },
  {
    index: "/content",
    label: "Contenido",
    icon: Document,
    visible: () => features.dashboard.performance,
    children: [
      {
        index: "/content/pages",
        label: "Páginas",
      },
      {
        index: "/content/blog",
        label: "Blog",
      },
    ],
  },
  {
    index: "/settings",
    label: "Configuración",
    icon: Setting,
    visible: () => features.dashboard.settings,
  },
]

export const getVisibleMenuItems = () => {
  return menuConfig.filter((item) => {
    if (!item.visible) return true
    return item.visible()
  })
}

export default menuConfig
