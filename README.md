src/
│
├── assets/
│   ├── styles/
│   │   └── tailwind.css
│   └── images/
│
├── components/
│   ├── common/          # Componentes reutilizables
│   │   ├── BaseButton.vue
│   │   ├── BaseModal.vue
│   │   └── Loader.vue
│   │
│   ├── layout/
│   │   ├── AppSidebar.vue
│   │   ├── AppNavbar.vue
│   │   └── AppFooter.vue
│   │
│   └── ui/              # Wrappers de Element Plus si deseas customizar
│       └── ElTableWrapper.vue
│
├── composables/
│   └── useAuth.js
│
├── layouts/
│   └── DashboardLayout.vue
│
├── modules/             # POR FEATURE / DOMINIO
│   ├── auth/
│   │   ├── pages/
│   │   │   └── LoginPage.vue
│   │   ├── components/
│   │   │   └── LoginForm.vue
│   │   ├── store/
│   │   │   └── auth.store.js
│   │   └── services/
│   │       └── auth.api.js
│   │
│   ├── users/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   └── services/
│   │
│   └── dashboard/
│       ├── pages/
│       └── components/
│
├── plugins confirms/
│   ├── element-plus.js
│   ├── i18n.js
│   └── pinia.js
│
├── router/
│   ├── index.js
│   └── routes.js
│
├── services/
│   ├── http.js          # Axios base
│   └── interceptors.js
│
├── store/
│   └── index.js         # Pinia global
│
├── locales/
│   ├── es.json
│   └── en.json
│
├── utils/
│   ├── formatDate.js
│   └── validators.js
│
├── App.vue
└── main.js
