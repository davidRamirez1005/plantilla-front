import features from "@/config/features"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/modules/dashboard/pages/DashboardPage.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/modules/auth/pages/NotFoundPage.vue"),
    meta: { layout: "empty" },
  },
]

if (features.auth) {
  routes.push({
    path: "/login",
    name: "Login",
    component: () => import("@/modules/auth/pages/LoginPage.vue"),
    meta: { layout: "auth" },
  })
}

if (features.modules.dashboard) {

  routes.push({
    path: "/dashboard",
     name: "Dashboard",
     component: () => import("@/modules/dashboard/pages/DashboardPage.vue"),
     meta: {
      requiresAuth: false,
       layout: "default",
       breadcrumb: [{ label: "breadcrumb.home", link: "/" }, { label: "breadcrumb.dashboard" }],
     },
   })

  routes.push({
    path: "/users/list",
    name: "ListaUsuarios",
    component: () => import("@/modules/dashboard/users/pages/UsersPage.vue"),
    meta: {
      requiresAuth: false,
      layout: "default",
      breadcrumb: [
        { label: "breadcrumb.home", link: "/" },
        { label: "breadcrumb.dashboard", link: "/dashboard" },
        { label: "breadcrumb.users" },
        { label: "breadcrumb.usersList" },
      ],
    },
  })

  routes.push({
    path: "/library/reservations",
    name: "Reservas",
    component: () => import("@/modules/dashboard/library/pages/ReservationsPage.vue"),
    meta: {
      requiresAuth: false,
      layout: "default",
      breadcrumb: [
        { label: "breadcrumb.home", link: "/" },
        { label: "breadcrumb.dashboard", link: "/dashboard" },
        { label: "breadcrumb.library" },
        { label: "breadcrumb.reservations" },
      ],
    },
  })

  routes.push({
    path: "/library/inventory",
    name: "Inventario",
    component: () => import("@/modules/dashboard/library/pages/InventoryPage.vue"),
    meta: {
      requiresAuth: false,
      layout: "default",
      breadcrumb: [
        { label: "breadcrumb.home", link: "/" },
        { label: "breadcrumb.dashboard", link: "/dashboard" },
        { label: "breadcrumb.library" },
        { label: "breadcrumb.inventory" },
      ],
    },
  })
}

if (features.modules.eCommerce) {
  routes.push({
    path: "/roluna",
    name: "Roluna",
    component: () => import("@/modules/eCommerce/pages/HomePage.vue"),
    meta: {
      requiresAuth: false,
      layout: "ecommerce",
      // breadcrumb: [

      // ],
    },
  })
}
export default routes
