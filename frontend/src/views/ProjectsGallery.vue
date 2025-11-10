<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" style="animation: pulse 3s ease-in-out infinite; animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          My Projects
        </h1>
        <p class="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
          A collection of projects showcasing my skills in full-stack development, AI/ML, and creative web experiences
        </p>
        
        <!-- Filter Tags -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <button
            @click="filterCategory = 'all'"
            :class="filterCategory === 'all' ? 'bg-white text-purple-600' : 'bg-white/20 text-white border-2 border-white/50'"
            class="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
          >
            All Projects
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="filterCategory = category"
            :class="filterCategory === category ? 'bg-white text-purple-600' : 'bg-white/20 text-white border-2 border-white/50'"
            class="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
          >
            {{ category }}
          </button>
        </div>

        <!-- Stats -->
        <div class="flex justify-center gap-8 text-white">
          <div>
            <div class="text-3xl font-bold">{{ projects.length }}</div>
            <div class="text-sm text-purple-200">Total Projects</div>
          </div>
          <div>
            <div class="text-3xl font-bold">{{ uniqueTechnologies }}</div>
            <div class="text-sm text-purple-200">Technologies</div>
          </div>
          <div>
            <div class="text-3xl font-bold">{{ categories.length }}</div>
            <div class="text-sm text-purple-200">Categories</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl mb-4"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-else-if="filteredProjects.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Project Image/Gradient -->
            <div class="relative h-56 overflow-hidden bg-gradient-to-br"
                 :style="{ background: getProjectGradient(index) }">
              <img v-if="project.image" 
                   :src="project.image" 
                   :alt="project.title" 
                   class="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <!-- Overlay Icon -->
              <div class="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-50 group-hover:opacity-0 transition-opacity">
                {{ getProjectEmoji(project.category || project.tech[0]) }}
              </div>

              <!-- Status Badge -->
              <div v-if="project.status" class="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold"
                   :class="getStatusColor(project.status)">
                {{ project.status }}
              </div>

              <!-- Year Badge -->
              <div class="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs font-semibold">
                {{ project.year }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-3 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {{ project.title }}
              </h3>

              <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Tech Stack Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.tech.slice(0, 3)"
                  :key="tech"
                  class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full"
                >
                  {{ tech }}
                </span>
                <span v-if="project.tech.length > 3" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-full">
                  +{{ project.tech.length - 3 }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <router-link
                  :to="`/projects/${project.id}`"
                  class="flex-1 text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  View Details
                </router-link>
                <a v-if="project.github"
                   :href="project.github"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                   title="View on GitHub"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Hover Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold mb-2 dark:text-white">No projects found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try selecting a different category</p>
          <button
            @click="filterCategory = 'all'"
            class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all"
          >
            Show All Projects
          </button>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6 dark:text-white">
          <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Have a Project in Mind?
          </span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          I'm always excited to work on new challenges and collaborate on innovative ideas.
        </p>
        <router-link
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span>Get In Touch</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(true)
const projects = ref([])
const filterCategory = ref('all')

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
]

const categories = computed(() => {
  const cats = new Set()
  projects.value.forEach(p => {
    if (p.category) cats.add(p.category)
  })
  return Array.from(cats)
})

const uniqueTechnologies = computed(() => {
  const techs = new Set()
  projects.value.forEach(p => {
    if (p.tech) p.tech.forEach(t => techs.add(t))
  })
  return techs.size
})

const filteredProjects = computed(() => {
  if (filterCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(p => p.category === filterCategory.value)
})

function getProjectGradient(index) {
  return gradients[index % gradients.length]
}

function getProjectEmoji(categoryOrTech) {
  const lower = (categoryOrTech || '').toLowerCase()
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('yolo')) return '🤖'
  if (lower.includes('computer vision')) return '👁️'
  if (lower.includes('backend') || lower.includes('api')) return '⚙️'
  if (lower.includes('frontend') || lower.includes('vue') || lower.includes('react')) return '🎨'
  if (lower.includes('mobile')) return '📱'
  if (lower.includes('game')) return '🎮'
  if (lower.includes('creative')) return '✨'
  return '🚀'
}

function getStatusColor(status) {
  const lower = (status || '').toLowerCase()
  if (lower.includes('completed')) return 'text-green-600'
  if (lower.includes('progress') || lower.includes('development')) return 'text-blue-600'
  if (lower.includes('production') || lower.includes('live')) return 'text-purple-600'
  return 'text-gray-600'
}

async function loadProjects() {
  loading.value = true
  try {
    const res = await axios.get('/api/projects', { timeout: 4000 })
    projects.value = Array.isArray(res.data) ? res.data : []
    if (!projects.value.length) throw new Error('Empty list')
  } catch (e) {
    // Fallback to local data
    try {
      const localData = await import('@/data/projects.json')
      projects.value = localData.default || []
    } catch {
      projects.value = []
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}
</style>
