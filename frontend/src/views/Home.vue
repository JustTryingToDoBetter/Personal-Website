<template>
  <div class="relative overflow-hidden min-h-screen text-gray-900">
    <!-- animated gradient background layer -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-[#FF007A]/10 via-[#00FFF0]/10 to-[#250045]/10 animate-gradientShift"
      aria-hidden="true"
    />

    <!-- Hero Section -->
    <section class="bg-white py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-extrabold tracking-tight mb-4">
          Welcome to my Portfolio
        </h1>
        <p class="mb-8 text-lg max-w-3xl mx-auto text-gray-700">
          I'm Jaydin Morrison, a software engineer passionate about building
          beautiful and performant web applications. Explore my work and get in
          touch!
        </p>
        <router-link
          to="/projects"
          class="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          View Projects
        </router-link>
      </div>
    </section>

    <!-- Latest Projects Section -->
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-semibold mb-6">Latest Projects</h2>

        <div v-if="projects.length" class="grid md:grid-cols-2 gap-8">
          <article
            v-for="project in projects"
            :key="project.id"
            class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-700 mb-4 line-clamp-3">
              {{ project.description }}
            </p>
            <router-link
              :to="`/projects/${project.id}`"
              class="text-blue-600 hover:underline"
            >
              Read more
            </router-link>
          </article>
        </div>

        <p v-else class="text-gray-600">No projects found.</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
    }
  },
  async created() {
    try {
      // Try the API first
      const res = await axios.get('/projects', { timeout: 4000 })
      this.projects = Array.isArray(res.data) ? res.data.slice(0, 4) : []
      if (!this.projects.length) throw new Error('Empty list')
    } catch (e) {
      // Fallback mock content (so the UI never looks empty during dev)
      this.projects = [
        {
          id: 1,
          title: 'Neural Pulse',
          description:
            'Interactive real-time data streams rendered through a sleek cyberpunk UI.',
        },
        {
          id: 2,
          title: 'EchoGrid',
          description:
            'Asynchronous dashboard visualizer for futuristic system telemetry.',
        },
        {
          id: 3,
          title: 'OrbitVision',
          description:
            '3D multi-object tracking visualizer powered by YOLOv8 and DeepSORT.',
        },
        {
          id: 4,
          title: 'Maski Playground',
          description:
            'Micro-apps and experiments to showcase fast, playful interactions.',
        },
      ]
      // console.warn('API unavailable; showing mock projects', e)
    }
  },
}
</script>

<style scoped>
/* Clamp the description to three lines */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
