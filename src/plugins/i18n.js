import { createI18n } from "vue-i18n"
import features from "@/config/features"
import esService from "@/locales/service/es"
import enService from "@/locales/service/en"

let i18n = null

if (features.i18n) {
  const messages = {
    es: esService,
    en: enService,
  }

  // Cargar archivos de locales directos (/locales/*.js)
  const locales = import.meta.glob("@/locales/*.js", { eager: true })
  Object.keys(locales).forEach((path) => {
    const locale = path.match(/\/([^/]+)\.js$/)?.[1]
    if (locale) messages[locale] = locales[path].default
  })

  // Cargar archivos de locales en subdirectorios (/locales/*/es.js, /locales/*/en.js)
  const subLocales = import.meta.glob("@/locales/*/*.js", { eager: true })
  Object.keys(subLocales).forEach((path) => {
    const matches = path.match(/locales\/([^/]+)\/([^/]+)\.js$/)
    if (matches) {
      const [, category, locale] = matches
      if (!messages[locale]) messages[locale] = {}
      messages[locale][category] = subLocales[path].default
    }
  })

  // Cargar locales de módulos
  const moduleLocales = import.meta.glob("@/modules/*/locales/*.js", { eager: true })
  Object.keys(moduleLocales).forEach((path) => {
    const matches = path.match(/modules\/([^/]+)\/locales\/([^/]+)\.js$/)
    if (matches) {
      const [, module, locale] = matches
      if (!messages[locale]) messages[locale] = {}
      messages[locale][module] = moduleLocales[path].default
    }
  })

  i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") || "es",
    fallbackLocale: "es",
    messages,
  })
}

export { i18n }
