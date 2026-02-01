<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="text-gray-600">
        © {{ currentYear }} {{ appTitle }}. Todos los derechos reservados. <span><a href="https://jose-david-ramirez.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold hover:decoration-blue-300">Jose David Ramirez</a></span>
      </p>
    </div>
  </footer>
</template>

<script setup>
const appTitle = import.meta.env.VITE_APP_TITLE || 'Mi App'
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {  
  background-color: var(--app-bg-third);
  color: white;
  padding: 10px 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 850px) {
  p {
    font-size: small;
  }
}
</style>
