import { Calendar, User, ShoppingCart } from "@element-plus/icons-vue"
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
    index: "/reservations",
    label: "Reservar",
    icon: Calendar,
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
    ],
  },
  {
    index: "/library",
    label: "Biblioteca",
    icon: ShoppingCart,
    visible: () => features.dashboard.management,
    children: [
      {
        index: "/library/reservations",
        label: "Reservas",
      },
      {
        index: "/library/inventory",
        label: "Inventario",
      },
    ],
  },
]

export const getVisibleMenuItems = () => {
  return menuConfig.filter((item) => {
    if (!item.visible) return true
    return item.visible()
  })
}

export default menuConfig
