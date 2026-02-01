import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { pinia } from "./store"
import { i18n } from "./plugins/i18n"
import { setupElementPlus, toggleDarkMode } from "./plugins/element-plus"
import "./assets/styles/style.css"

const app = createApp(App)

app.use(router)
app.use(pinia)
if (i18n) app.use(i18n)

setupElementPlus(app)

const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  toggleDarkMode(true)
}

app.mount("#app")
