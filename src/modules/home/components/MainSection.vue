<template>
  <div>
    <!-- <Skeleton variant="card" :animated="true" :loading="isLoading" /> -->
    <section class="hero-section">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Transformamos tus ideas en
          <span class="text-blue-600">soluciones digitales</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Desarrollo de software personalizado, diseño web profesional y tutorías de programación
          para impulsar tu carrera
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <el-button type="primary" size="large" @click="scrollToContact">
            Comenzar ahora
          </el-button>
          <el-button size="large" @click="scrollToServices"> Conocer servicios </el-button>
        </div>
      </div>
    </section>

    <section id="services" class="services-section dark:bg-gray-300">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Soluciones adaptadas a tus necesidades
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <el-card class="service-card" shadow="hover">
            <div class="text-center">
              <div class="icon-container mb-4">
                <el-icon :size="48" color="#409EFF">
                  <Monitor />
                </el-icon>
              </div>
              <h3 class="text-2xl font-semibold mb-3">Desarrollo de Software</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Creamos aplicaciones a medida que optimizan tus procesos empresariales y mejoran la
                productividad
              </p>
              <ul class="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Aplicaciones web y móviles</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Sistemas empresariales</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>APIs y microservicios</span>
                </li>
              </ul>
            </div>
          </el-card>

          <el-card class="service-card" shadow="hover">
            <div class="text-center">
              <h3 class="text-2xl font-semibold mb-3">Páginas Web</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Diseñamos sitios web modernos, responsivos y optimizados para destacar tu presencia
                online
              </p>
              <ul class="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Diseño responsive y moderno</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>SEO optimizado</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>E-commerce y landing pages</span>
                </li>
              </ul>
            </div>
          </el-card>

          <el-card class="service-card" shadow="hover">
            <div class="text-center">
              <div class="icon-container mb-4">
                <el-icon :size="48" color="#E6A23C">
                  <Reading />
                </el-icon>
              </div>
              <h3 class="text-2xl font-semibold mb-3">Tutorías de Programación</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Aprende a programar con mentorías personalizadas y contenido adaptado a tu nivel
              </p>
              <ul class="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Clases personalizadas 1 a 1</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Tecnologías modernas</span>
                </li>
                <li class="flex items-start">
                  <el-icon class="mt-1 mr-2"><Check /></el-icon>
                  <span>Proyectos prácticos</span>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Compromiso con la calidad y la excelencia
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="feature-item text-center p-6">
            <el-icon :size="32" color="#409EFF" class="mb-3">
              <Trophy />
            </el-icon>
            <h4 class="font-semibold mb-2 text-lg">Calidad Garantizada</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Código limpio y buenas prácticas en cada proyecto
            </p>
          </div>

          <div class="feature-item text-center p-6">
            <el-icon :size="32" color="#67C23A" class="mb-3">
              <Timer />
            </el-icon>
            <h4 class="font-semibold mb-2 text-lg">Entrega a Tiempo</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Cumplimos con los plazos establecidos
            </p>
          </div>

          <div class="feature-item text-center p-6">
            <el-icon :size="32" color="#E6A23C" class="mb-3">
              <ChatDotRound />
            </el-icon>
            <h4 class="font-semibold mb-2 text-lg">Soporte Continuo</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Asistencia y mantenimiento post-lanzamiento
            </p>
          </div>

          <div class="feature-item text-center p-6">
            <el-icon :size="32" color="#F56C6C" class="mb-3">
              <Expand />
            </el-icon>
            <h4 class="font-semibold mb-2 text-lg">Escalabilidad</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Soluciones que crecen con tu negocio
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tech-section bg-gray-50 dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Tecnologías que dominamos</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Trabajamos con las herramientas más modernas
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <el-tag v-for="tech in technologies" :key="tech" size="large" class="tech-tag">
            {{ tech }}
          </el-tag>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Skeleton from "@/components/ui/Skeleton.vue"
import { ElMessage } from "element-plus"
import {
  Monitor,
  // Chrome,
  Reading,
  Check,
  Trophy,
  Timer,
  ChatDotRound,
  Expand,
  Message,
  Phone,
} from "@element-plus/icons-vue"

const isLoading = ref(true)

const technologies = [
  "Vue.js",
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
]

const scrollToServices = () => {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
}

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

const handleSubmit = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    ElMessage.warning("Por favor completa todos los campos requeridos")
    return
  }

  ElMessage.success("¡Mensaje enviado! Nos pondremos en contacto pronto.")

  // Reset form
  contactForm.value = {
    name: "",
    email: "",
    service: "",
    message: "",
  }
}
</script>

<style scoped>
.landing-container {
  width: 100%;
}

.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--app-bg-primary) 0%, var(--app-bg-secondary) 100%);
}

.service-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-item {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background-color: var(--app-bg-secondary);
}

.tech-tag {
  font-size: 16px;
  padding: 12px 20px;
}

.contact-card {
  text-align: left;
}

.contact-form {
  margin-top: 20px;
}

.footer a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .hero-section p {
    font-size: 1.125rem;
  }
}
</style>
