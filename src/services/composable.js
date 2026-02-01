import { ref } from 'vue'
import { ElNotification, ElLoading } from 'element-plus'
import { messageConfig, notificationConfig } from '@/plugins/element-plus'

import esLocale from '@/locales/service/es'
import enLocale from '@/locales/service/en'

const getLocale = () => {
  const lang = localStorage.getItem('locale') || 'es'
  return lang === 'en' ? enLocale : esLocale
}

const t = (path) => {
  const locale = getLocale()
  const keys = path.split('.')
  let value = locale

  for (const key of keys) {
    value = value?.[key]
    if (!value) return path
  }

  return value
}

/**
 * Composable para manejo de notificaciones
 */
export function useNotification() {
  const notify = (title, message, type = 'info') => {
    ElNotification({
      ...notificationConfig,
      title,
      message,
      type,
    })
  }

  return {
    success: (title = null, message = null) =>
      notify(
        title || t('notifications.success.title'),
        message || t('notifications.success.default'),
        'success'
      ),
    error: (title = null, message = null) =>
      notify(
        title || t('notifications.error.title'),
        message || t('notifications.error.default'),
        'error'
      ),
    warning: (title = null, message = null) =>
      notify(
        title || t('notifications.warning.title'),
        message || t('notifications.warning.default'),
        'warning'
      ),
    info: (title = null, message = null) =>
      notify(
        title || t('notifications.info.title'),
        message || t('notifications.info.default'),
        'info'
      ),
    notify,
  }
}

/**
 * Composable para manejo de estados de carga
 */
export function useLoading() {
  const loading = ref(false)
  let loadingInstance = null

  /**
   * @param {string} text - Texto opcional a mostrar (usa key de traducción o texto directo)
   * @param {boolean} fullscreen - Si debe cubrir toda la pantalla
   */
  const startLoading = (text = null, fullscreen = true) => {
    loading.value = true

    const loadingText = text
      ? text.includes('.')
        ? t(`loading.${text}`) || t('loading.default')
        : text
      : t('loading.default')

    loadingInstance = ElLoading.service({
      lock: true,
      text: loadingText,
      fullscreen,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  const stopLoading = () => {
    loading.value = false
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }

  /**
   * Ejecuta una función async con loading automático
   */
  const withLoading = async (
    fn,
    loadingText = 'processing',
    successMsg = null,
    errorMsg = null
  ) => {
    const { success, error } = useNotification()

    try {
      startLoading(loadingText)
      const result = await fn()

      if (successMsg) {
        success(null, successMsg)
      }

      return result
    } catch (err) {
      error(null, errorMsg || t('notifications.error.default'))
      throw err
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    startLoading,
    stopLoading,
    withLoading,
    startSaving: () => startLoading('saving'),
    startDeleting: () => startLoading('deleting'),
    startUpdating: () => startLoading('updating'),
    startLoadingData: () => startLoading('loading_data'),
  }
}
