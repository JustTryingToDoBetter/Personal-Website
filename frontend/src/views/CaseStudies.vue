<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-sm font-semibold border border-white/20 mb-6">
            💼 Deep-Dive Case Studies
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            Project Case Studies
          </h1>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            In-depth explorations of challenges faced, solutions crafted, and lessons learned from real-world projects.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Case Study -->
    <section v-if="featuredStudy" class="container mx-auto px-4 py-16">
      <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-purple-200 dark:border-gray-700">
        <div class="grid md:grid-cols-2 gap-0">
          <!-- Image/Visual -->
          <div class="relative h-64 md:h-auto bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <div class="text-center p-8">
              <div class="text-8xl mb-4">{{ featuredStudy.emoji }}</div>
              <div class="text-white/80 text-sm font-medium">Featured Case Study</div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-8 md:p-12">
            <div class="inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-semibold rounded-full mb-4">
              ⭐ Featured
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ featuredStudy.title }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {{ featuredStudy.summary }}
            </p>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ featuredStudy.impact }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Impact</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ featuredStudy.duration }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Duration</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ featuredStudy.tech.length }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>
            
            <router-link
              :to="`/case-studies/${featuredStudy.id}`"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Read Full Case Study
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- All Case Studies Grid -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
        All Case Studies
      </h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="study in caseStudies"
          :key="study.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
        >
          <!-- Header with Icon -->
          <div class="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="text-6xl mb-2 relative z-10">{{ study.emoji }}</div>
            <div class="text-white/90 text-sm font-medium relative z-10">{{ study.category }}</div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {{ study.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {{ study.summary }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in study.tech.slice(0, 3)"
                :key="tech"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {{ tech }}
              </span>
              <span v-if="study.tech.length > 3" class="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                +{{ study.tech.length - 3 }} more
              </span>
            </div>
            
            <!-- Metrics -->
            <div class="flex items-center justify-between text-sm mb-4">
              <span class="text-gray-600 dark:text-gray-400">
                <span class="font-semibold text-gray-900 dark:text-white">{{ study.duration }}</span>
              </span>
              <span class="text-purple-600 dark:text-purple-400 font-medium">
                {{ study.impact }}
              </span>
            </div>
            
            <router-link
              :to="`/case-studies/${study.id}`"
              class="block text-center py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all duration-300"
            >
              Read Case Study →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-cyan-600 to-blue-600 py-16 mt-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Want to Build Something Amazing?
        </h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto">
          These case studies represent just the beginning. Let's collaborate on your next big idea.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/contact"
            class="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start a Conversation
          </router-link>
          <router-link
            to="/projects"
            class="inline-block px-8 py-4 bg-blue-500/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            View All Projects
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// This will be populated from your projects.json or a separate case-studies.json
const caseStudies = ref([
  {
    id: 'football-tracking',
    title: 'AI-Powered Football Player Tracking',
    emoji: '⚽',
    category: 'AI/ML • Computer Vision',
    summary: 'Built a real-time player tracking system using YOLOv8 and DeepSORT, achieving 92% detection accuracy and 81 FPS performance for professional sports analytics.',
    tech: ['YOLOv8', 'DeepSORT', 'TensorRT', 'OpenCV', 'Python'],
    duration: '4 months',
    impact: '92% accuracy',
    featured: true
  },
  {
    id: 'threejs-portfolio',
    title: '3D Cosmic Portfolio Experience',
    emoji: '🌌',
    category: 'Web Development • 3D Graphics',
    summary: 'Designed and developed an immersive 3D portfolio website featuring planetary project showcases, custom shaders, and WebGL optimizations.',
    tech: ['Three.js', 'TroisJS', 'Vue 3', 'WebGL', 'GLSL'],
    duration: '3 months',
    impact: '10x engagement',
    featured: false
  },
  {
    id: 'analytics-server',
    title: 'Real-Time Analytics Server',
    emoji: '📊',
    category: 'Backend • Data Processing',
    summary: 'Architected a high-performance analytics server handling 10K+ requests/second with real-time data aggregation and visualization.',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'WebSockets'],
    duration: '3 months',
    impact: '10K+ req/s',
    featured: false
  }
])

const featuredStudy = computed(() => {
  return caseStudies.value.find(study => study.featured)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
