<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-6">Projects</h1>
    <div v-if="projects.length" class="space-y-8">
      <div v-for="project in projects" :key="project.id" class="p-6 bg-white rounded shadow">
        <h2 class="text-2xl font-semibold mb-2">{{ project.title }}</h2>
        <p class="text-gray-700 mb-4">{{ project.description }}</p>
        <router-link :to="`/projects/${project.id}`" class="text-blue-600 hover:underline">
          View details
        </router-link>
      </div>
    </div>
    <p v-else class="text-gray-600">No projects available.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Projects',
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
      console.error('Error loading projects', error)
    }
  },
}
</script>