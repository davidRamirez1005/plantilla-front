<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <img src="@/assets/img/logo.svg" alt="Logo" class="logo" />
          <h1 class="text-2xl font-bold text-gray-800">{{ appTitle }}</h1>
        </div>

        <div class="auth-content">
          <slot />
        </div>

        <div class="auth-footer">
          <p class="text-sm text-gray-500">
            © {{ currentYear }} {{ appTitle }}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Mi App'
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-header {
  padding: 40px 40px 20px;
  text-align: center;
  background: linear-gradient(to bottom, #f9fafb, white);
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.auth-content {
  padding: 20px 40px 40px;
}

.auth-footer {
  padding: 20px;
  text-align: center;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 640px) {
  .auth-header,
  .auth-content {
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>
