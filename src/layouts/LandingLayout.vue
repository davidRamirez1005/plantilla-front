<template>
  <div class="landing-layout">
    <AppNavbar />

    <main class="landing-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style scoped>
.landing-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing-content {
  flex: 1;
}
</style>
