<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section v-if="!loading && project" class="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" style="animation: pulse 3s ease-in-out infinite; animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <router-link to="/projects" class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Back to Projects</span>
        </router-link>

        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">{{ project.title }}</h1>
          <p class="text-xl text-purple-100 mb-6">{{ project.tagline || project.description?.split('.')[0] }}</p>
          
          <div class="flex flex-wrap gap-4 mb-8">
            <span v-if="project.year" class="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold">
              📅 {{ project.year }}
            </span>
            <span v-if="project.status" class="px-4 py-2 bg-green-500/30 backdrop-blur-md rounded-full text-white font-semibold">
              ✅ {{ project.status }}
            </span>
            <span v-if="project.category" class="px-4 py-2 bg-purple-500/30 backdrop-blur-md rounded-full text-white font-semibold">
              🏷️ {{ project.category }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Code
            </a>
            <a v-if="project.liveDemo" :href="project.liveDemo" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/30 transition-all hover:scale-105 shadow-xl">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-16 max-w-6xl">
      <div class="animate-pulse space-y-8">
        <div class="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div class="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="project" class="container mx-auto px-4 py-16 max-w-6xl">
      <!-- Featured Image/Demo -->
      <section v-if="project.image || project.demo" class="mb-16">
        <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 dark:border-gray-800">
          <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-auto" />
          <video v-else-if="project.demo" :src="project.demo" autoplay loop muted playsinline class="w-full h-auto"></video>
        </div>
      </section>

      <!-- Quick Stats -->
      <section v-if="project.stats" class="mb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in project.stats" :key="stat.label" 
               class="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ stat.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Main Content Column -->
        <div class="lg:col-span-2 space-y-16">
          <!-- Problem Statement -->
          <section>
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">🎯</span>
              The Challenge
            </h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ project.problem || project.description }}
              </p>
            </div>
          </section>

          <!-- Solution -->
          <section>
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">💡</span>
              My Solution
            </h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ project.solution || 'I developed a comprehensive solution leveraging modern web technologies and best practices to address these challenges effectively.' }}
              </p>
            </div>
          </section>

          <!-- Key Features -->
          <section>
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">⚡</span>
              Key Features
            </h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="(feature, index) in project.features || defaultFeatures" :key="index"
                   class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 class="font-semibold dark:text-white mb-1">{{ feature.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Architecture/Tech Deep Dive -->
          <section v-if="project.architecture">
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">🏗️</span>
              Architecture
            </h2>
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <img v-if="project.architecture.image" :src="project.architecture.image" alt="Architecture Diagram" class="w-full rounded-lg mb-4" />
              <p class="text-gray-700 dark:text-gray-300">{{ project.architecture.description }}</p>
            </div>
          </section>

          <!-- Code Snippets -->
          <section v-if="project.codeSnippets && project.codeSnippets.length">
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xl">💻</span>
              Code Highlights
            </h2>
            <div class="space-y-6">
              <div v-for="(snippet, index) in project.codeSnippets" :key="index" class="bg-gray-900 rounded-2xl overflow-hidden">
                <div class="px-6 py-3 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                  <span class="text-gray-300 font-mono text-sm">{{ snippet.title }}</span>
                  <span class="text-xs text-gray-500">{{ snippet.language }}</span>
                </div>
                <pre class="p-6 overflow-x-auto"><code class="text-sm text-gray-300 font-mono">{{ snippet.code }}</code></pre>
              </div>
            </div>
          </section>

          <!-- Results & Impact -->
          <section>
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl">📈</span>
              Results & Impact
            </h2>
            <div class="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-750 rounded-2xl">
              <ul class="space-y-4">
                <li v-for="(result, index) in project.results || defaultResults" :key="index" 
                    class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ result }}</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Lessons Learned -->
          <section>
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl">📚</span>
              Lessons Learned
            </h2>
            <div class="space-y-4">
              <div v-for="(lesson, index) in project.lessons || defaultLessons" :key="index"
                   class="p-6 bg-orange-50 dark:bg-gray-800 rounded-xl border-l-4 border-orange-500">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ lesson }}</p>
              </div>
            </div>
          </section>

          <!-- Screenshots Gallery -->
          <section v-if="project.screenshots && project.screenshots.length">
            <h2 class="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
              <span class="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white text-xl">📸</span>
              Screenshots
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="(screenshot, index) in project.screenshots" :key="index"
                   class="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <img :src="screenshot.url" :alt="screenshot.caption" class="w-full h-auto" />
                <div v-if="screenshot.caption" class="p-4 bg-gray-50 dark:bg-gray-800">
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ screenshot.caption }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Tech Stack -->
          <div class="sticky top-8">
            <section class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <span class="text-2xl">🛠️</span>
                Tech Stack
              </h3>
              <div class="space-y-4">
                <div v-for="category in project.techStack || defaultTechStack" :key="category.name">
                  <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {{ category.name }}
                  </h4>
                  <div class="space-y-2">
                    <div v-for="tech in category.items" :key="tech.name" 
                         class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                      <span class="font-medium dark:text-white text-sm">{{ tech.name }}</span>
                      <span v-if="tech.version" class="text-xs text-gray-500 dark:text-gray-400">{{ tech.version }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Project Timeline -->
            <section v-if="project.timeline" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-8">
              <h3 class="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <span class="text-2xl">⏱️</span>
                Timeline
              </h3>
              <div class="space-y-3">
                <div v-for="(milestone, index) in project.timeline" :key="index" class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div class="font-semibold text-sm dark:text-white">{{ milestone.title }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ milestone.date }}</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Team/Role -->
            <section v-if="project.team" class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-8">
              <h3 class="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                <span class="text-2xl">👥</span>
                Team
              </h3>
              <div class="space-y-3">
                <div v-for="member in project.team" :key="member.name">
                  <div class="font-semibold text-sm dark:text-white">{{ member.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ member.role }}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <section class="mt-20 text-center py-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 rounded-3xl">
        <h2 class="text-4xl font-bold text-white mb-6">Interested in Similar Work?</h2>
        <p class="text-xl text-purple-100 mb-8">Let's collaborate on your next project!</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/contact"
                       class="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl">
            Get In Touch
          </router-link>
          <router-link to="/projects"
                       class="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/30 transition-all hover:scale-105 shadow-xl">
            View More Projects
          </router-link>
        </div>
      </section>
    </div>

    <!-- Not Found -->
    <div v-else class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Project Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist or has been moved.</p>
        <router-link to="/projects" 
                     class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Projects
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const loading = ref(true)
const project = ref(null)

// Default fallback content for projects without detailed data
const defaultFeatures = computed(() => [
  { title: 'Modern Architecture', description: 'Built with scalable and maintainable code structure' },
  { title: 'Responsive Design', description: 'Optimized for all devices and screen sizes' },
  { title: 'Performance Optimized', description: 'Fast load times and smooth interactions' },
  { title: 'User-Friendly', description: 'Intuitive interface and great UX' }
])

const defaultResults = computed(() => [
  'Successfully delivered a fully functional solution',
  'Gained valuable experience with modern technologies',
  'Received positive feedback from users and stakeholders',
  'Enhanced my skills in full-stack development'
])

const defaultLessons = computed(() => [
  'The importance of proper planning and architecture before diving into code',
  'How to balance feature completeness with project deadlines',
  'The value of user feedback and iterative development',
  'Best practices for code organization and documentation'
])

const defaultTechStack = computed(() => {
  const tech = project.value?.tech || []
  return [
    {
      name: 'Technologies',
      items: tech.map(t => ({ name: t, version: '' }))
    }
  ]
})

async function loadProject(id) {
  loading.value = true
  project.value = null
  
  try {
    // Try API first
    const res = await axios.get(`/api/projects/${id}`)
    project.value = transformApiProject(res.data)
  } catch (err) {
    // Fallback to local projects.json
    try {
      const res = await axios.get('/src/data/projects.json')
      const found = Array.isArray(res.data) ? res.data.find((x) => String(x.id) === String(id)) : null
      if (found) {
        project.value = enhanceProjectData(found)
      }
    } catch (e) {
      console.error('Error loading project:', e)
    }
  } finally {
    loading.value = false
  }
}

function transformApiProject(data) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image_url || '',
    year: data.created_at ? new Date(data.created_at).getFullYear() : '',
    tech: [],
    github: data.github_url || '',
    liveDemo: data.live_url || '',
    ...data
  }
}

function enhanceProjectData(projectData) {
  // Enhance with detailed structure based on project type
  const enhanced = { ...projectData }
  
  // Add default fields if missing
  if (!enhanced.problem) {
    enhanced.problem = enhanced.description
  }
  
  // Auto-generate features based on tech stack
  if (!enhanced.features && enhanced.tech) {
    enhanced.features = generateFeaturesFromTech(enhanced.tech)
  }
  
  // Build tech stack with categorization
  if (!enhanced.techStack && enhanced.tech) {
    enhanced.techStack = categorizeTechStack(enhanced.tech)
  }
  
  return enhanced
}

function generateFeaturesFromTech(techArray) {
  const features = []
  
  if (techArray.includes('YOLOv8') || techArray.includes('YOLO')) {
    features.push(
      { title: 'Real-Time Detection', description: 'Process video frames in real-time with high accuracy' },
      { title: 'Object Tracking', description: 'Track multiple objects across frames' }
    )
  }
  
  if (techArray.includes('Vue') || techArray.includes('Vue.js')) {
    features.push(
      { title: 'Reactive UI', description: 'Dynamic and responsive user interface' },
      { title: 'Component Architecture', description: 'Modular and reusable components' }
    )
  }
  
  if (techArray.includes('Django') || techArray.includes('FastAPI')) {
    features.push(
      { title: 'REST API', description: 'Well-structured API endpoints' },
      { title: 'Data Management', description: 'Efficient database operations' }
    )
  }
  
  if (techArray.includes('Three.js')) {
    features.push(
      { title: '3D Visualization', description: 'Immersive 3D graphics and animations' },
      { title: 'Interactive Experience', description: 'User-controlled camera and interactions' }
    )
  }
  
  // Add generic features if none were generated
  if (features.length === 0) {
    features.push(...defaultFeatures.value)
  }
  
  return features
}

function categorizeTechStack(techArray) {
  const categories = {
    frontend: [],
    backend: [],
    ml: [],
    devops: []
  }
  
  techArray.forEach(tech => {
    const lowerTech = tech.toLowerCase()
    
    if (lowerTech.includes('vue') || lowerTech.includes('react') || lowerTech.includes('three') || lowerTech.includes('tailwind')) {
      categories.frontend.push({ name: tech, version: '' })
    } else if (lowerTech.includes('django') || lowerTech.includes('fastapi') || lowerTech.includes('flask') || lowerTech.includes('node')) {
      categories.backend.push({ name: tech, version: '' })
    } else if (lowerTech.includes('yolo') || lowerTech.includes('tensorflow') || lowerTech.includes('opencv') || lowerTech.includes('python')) {
      categories.ml.push({ name: tech, version: '' })
    } else if (lowerTech.includes('docker') || lowerTech.includes('git') || lowerTech.includes('heroku')) {
      categories.devops.push({ name: tech, version: '' })
    } else {
      categories.frontend.push({ name: tech, version: '' })
    }
  })
  
  const result = []
  if (categories.frontend.length) result.push({ name: 'Frontend', items: categories.frontend })
  if (categories.backend.length) result.push({ name: 'Backend', items: categories.backend })
  if (categories.ml.length) result.push({ name: 'AI/ML', items: categories.ml })
  if (categories.devops.length) result.push({ name: 'DevOps', items: categories.devops })
  
  return result
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

<style scoped>
/* Code block styling */
pre {
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #1F2937;
}

pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #1F2937;
}

pre::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}

/* Smooth transitions */
* {
  transition-property: transform, shadow, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>
