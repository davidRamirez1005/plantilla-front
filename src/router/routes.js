import features from "@/config/features"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/modules/home/pages/HomePage.vue"),
    meta: { layout: "landing" },
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
    meta: { requiresAuth: false, layout: "default" },
  })

  routes.push({
    path: "/users/list",
    name: "ListaUsuarios",
    component: () => import("@/modules/dashboard/users/pages/UsersPage.vue"),
    meta: { requiresAuth: false, layout: "default" },
  })

  routes.push({
    path: "/users/roles",
    name: "RolesUsuarios",
    component: () => import("@/modules/dashboard/users/pages/PermissionsUserPage.vue"),
    meta: { requiresAuth: false, layout: "default" },
  })

  routes.push({
    path: "/settings/profile",
    name: "SettingsProfile",
    component: () => import("@/modules/dashboard/pages/SettingsProfilePage.vue"),
    meta: { requiresAuth: false, layout: "default" },
  })

  routes.push({
    path: "/settings",
    name: "Settings",
    component: () => import("@/modules/dashboard/settings/pages/SettingsPage.vue"),
    meta: { requiresAuth: false, layout: "default" },
  })
}

export default routes
