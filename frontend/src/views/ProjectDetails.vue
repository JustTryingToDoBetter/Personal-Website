<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <router-link to="/projects" class="text-blue-600 hover:underline">← Back to Projects</router-link>

    <div v-if="loading" class="mt-8 animate-pulse">
      <div class="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div class="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>

    <article v-else-if="project" class="mt-8">
      <h1 class="text-3xl font-bold mb-2">{{ project.title }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-6" v-if="project.year">{{ project.year }}</p>
      <img v-if="project.image" :src="project.image" class="w-full max-h-[28rem] object-cover rounded-xl mb-6" alt="" />

      <div class="prose dark:prose-invert max-w-none">
        <p class="whitespace-pre-line">{{ project.description }}</p>
      </div>

      <div v-if="project.tech && project.tech.length" class="mt-6 flex flex-wrap gap-2">
        <span v-for="t in project.tech" :key="t" class="text-xs uppercase tracking-wider px-2 py-1 rounded border border-gray-300 dark:border-gray-700">
          {{ t }}
        </span>
      </div>
    </article>

    <p v-else class="mt-8 text-gray-600 dark:text-gray-300">Project not found.</p>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const loading = ref(true)
const project = ref(null)

async function loadProject(id) {
  loading.value = true
  project.value = null
  // Try API first
  try {
    const res = await axios.get(`/api/projects/${id}`)
    const p = res.data
    project.value = {
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image_url || '',
      year: p.created_at ? new Date(p.created_at).getFullYear() : '',
      tech: [],
    }
  } catch (err) {
    // Fallback to local projects.json
    try {
      const res = await axios.get('/src/data/projects.json')
      const found = Array.isArray(res.data) ? res.data.find((x) => String(x.id) === String(id)) : null
      if (found) project.value = found
    } catch (e) {
      // ignore; project remains null
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProject(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadProject(newId)
  }
)
</script>
