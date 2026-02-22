<template>
  <div class="empty-layout">
    <slot />
  </div>
</template>

<script setup>
// Layout completamente vacío, útil para:
// - Páginas de error (404, 500)
// - Páginas de mantenimiento
</script>

<style scoped>
.empty-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
