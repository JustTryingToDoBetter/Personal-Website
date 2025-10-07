<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Welcome to my Portfolio</h1>
        <p class="mb-8 text-lg max-w-2xl mx-auto">
          I'm Jaydin Morrison, a software engineer passionate about building
          beautiful and performant web applications. Explore my work and get in
          touch!
        </p>
        <router-link
          to="/projects"
          class="inline-block px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
          <div
            v-for="project in projects"
            :key="project.id"
            class="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow"
          >
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-700 mb-4 line-clamp-3">{{ project.description }}</p>
            <router-link
              :to="`/projects/${project.id}`"
              class="text-blue-600 hover:underline"
            >
              Read more
            </router-link>
          </div>
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
      const response = await axios.get('/api/projects')
      this.projects = response.data
    } catch (error) {
      // In production we might send this error to an error tracking service
      console.error('Error fetching projects', error)
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