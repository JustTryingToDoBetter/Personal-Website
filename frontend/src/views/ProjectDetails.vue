<template>
  <div v-if="project" class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-4">{{ project.title }}</h1>
    <p class="text-gray-700 mb-4">{{ project.description }}</p>
    <img
      v-if="project.image_url"
      :src="project.image_url"
      :alt="project.title"
      class="mb-4 max-w-full h-auto rounded"
    />
    <router-link to="/projects" class="text-blue-600 hover:underline">
      &larr; Back to Projects
    </router-link>
  </div>
  <div v-else class="container mx-auto px-4 py-16 text-center">
    <p class="text-gray-600">Loading project...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProjectDetails',
  data() {
    return {
      project: null,
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await axios.get(`/api/projects/${id}/`)
      this.project = response.data
    } catch (error) {
      console.error('Error loading project', error)
    }
  },
}
</script>