<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Página no encontrada</h2>
      <p class="error-description">
        Lo sentimos, la página que buscas no existe.
      </p>
      <el-button type="primary" @click="goHome">
        Volver al inicio
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--app-bg-third) 0%, var(--app-bg-secondary) 100%);
  padding: 20px;
}

.not-found-content {
  text-align: center;
  color: var(--el-text-color-primary);
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.error-title {
  font-size: 2rem;
  margin: 20px 0 10px;
  font-weight: 600;
}

.error-description {
  font-size: 1.125rem;
  margin-bottom: 30px;
  opacity: 0.9;
}
</style>