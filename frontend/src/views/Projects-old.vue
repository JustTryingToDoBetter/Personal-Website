<template>
  <div
    ref="vantaRef"
    class="relative w-screen min-h-screen overflow-hidden text-white"
  >
    <!-- Dimmed Vanta background -->
    <div class="absolute inset-0 z-0"></div>
    <div class="absolute inset-0 bg-black/70 z-1"></div>

    <!-- Stars background -->
    <div class="absolute inset-0 z-2">
      <div v-for="i in 100" :key="i" 
           class="absolute w-1 h-1 bg-white rounded-full animate-pulse"
           :style="{ 
             left: Math.random() * 100 + '%', 
             top: Math.random() * 100 + '%',
             animationDelay: Math.random() * 3 + 's'
           }">
      </div>
    </div>

    <!-- Solar System Container -->
    <div class="relative z-10 w-full h-screen flex items-center justify-center">
      <div class="relative w-[800px] h-[800px] max-w-[90vmin] max-h-[90vmin]">
        
        <!-- Central Sun/Logo -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 shadow-[0_0_60px_#fbbf24] animate-pulse z-20">
          <div class="w-full h-full rounded-full bg-gradient-to-tr from-yellow-200 to-orange-500 animate-spin" style="animation-duration: 20s;"></div>
        </div>

        <!-- Project Planets -->
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="absolute planet-orbit"
          :style="getOrbitStyle(index)"
        >
          <!-- Orbit Ring -->
          <div class="orbit-ring absolute inset-0 border border-cyan-400/20 rounded-full"></div>
          
          <!-- Planet -->
          <div
            class="planet absolute w-16 h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-[0_0_30px_currentColor]"
            :class="getPlanetClass(index)"
            :style="getPlanetStyle(index)"
            @mouseenter="hoveredProject = project"
            @mouseleave="hoveredProject = null"
            @click="selectedProject = project"
          >
            <!-- Planet surface details -->
            <div class="w-full h-full rounded-full opacity-60 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div class="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
            <div class="absolute bottom-3 right-3 w-1 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>

        <!-- Hover Tooltip -->
        <div
          v-if="hoveredProject"
          class="fixed z-50 bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-cyan-400/30 shadow-[0_0_25px_#00fff066] max-w-xs pointer-events-none"
          :style="tooltipStyle"
        >
          <h3 class="text-lg font-orbitron text-cyan-300 mb-2">{{ hoveredProject.title }}</h3>
          <p class="text-sm text-gray-300 mb-2">{{ hoveredProject.year }}</p>
          <div class="flex flex-wrap gap-1 mb-2">
            <span v-for="tech in hoveredProject.tech?.slice(0, 3)" :key="tech" 
                  class="text-xs px-2 py-1 bg-cyan-400/20 text-cyan-300 rounded">
              {{ tech }}
            </span>
          </div>
          <p class="text-xs text-gray-400 line-clamp-3">{{ hoveredProject.description }}</p>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      @click="selectedProject = null"
    >
      <div
        class="bg-gray-900/95 backdrop-blur-xl text-white p-8 rounded-2xl border border-cyan-400/30 shadow-[0_0_50px_#00fff033] max-w-2xl max-h-[80vh] overflow-y-auto m-4"
        @click.stop
      >
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-3xl font-orbitron text-cyan-300">{{ selectedProject.title }}</h2>
          <button @click="selectedProject = null" class="text-gray-400 hover:text-white text-2xl">×</button>
        </div>
        
        <img v-if="selectedProject.image" 
             :src="selectedProject.image" 
             class="w-full h-48 object-cover rounded-xl mb-6" 
             alt="" />
        
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="text-gray-400">Year:</span>
            <span class="text-cyan-300">{{ selectedProject.year }}</span>
          </div>
          
          <div v-if="selectedProject.tech?.length">
            <span class="text-gray-400 block mb-2">Technologies:</span>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in selectedProject.tech" :key="tech" 
                    class="px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-sm">
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div>
            <span class="text-gray-400 block mb-2">Description:</span>
            <p class="text-gray-300 leading-relaxed">{{ selectedProject.description }}</p>
          </div>
          
          <div class="flex gap-4 pt-4">
            <router-link 
              :to="`/projects/${selectedProject.id}`"
              class="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              @click="selectedProject = null"
            >
              View Details
            </router-link>
            <a v-if="selectedProject.github" 
               :href="selectedProject.github" 
               target="_blank"
               class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import axios from 'axios'

const vantaRef = ref(null)
const projects = ref([])
const hoveredProject = ref(null)
const selectedProject = ref(null)
let vantaEffect = null

// Planet colors and styles
const planetColors = [
  'from-red-500 to-red-700',      // Mars-like
  'from-blue-400 to-blue-600',   // Earth-like
  'from-orange-400 to-orange-600', // Jupiter-like
  'from-purple-400 to-purple-600', // Mysterious planet
  'from-green-400 to-green-600',   // Forest planet
  'from-pink-400 to-pink-600',     // Alien planet
]

function getOrbitStyle(index) {
  const radius = 120 + (index * 80) // Increasing orbit radius
  const animationDuration = 20 + (index * 10) // Different speeds
  return {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: `orbit ${animationDuration}s linear infinite`,
  }
}

function getPlanetClass(index) {
  return `bg-gradient-to-br ${planetColors[index % planetColors.length]}`
}

function getPlanetStyle(index) {
  const angle = (index * 72) * (Math.PI / 180) // 72 degrees apart
  const radius = 120 + (index * 80)
  return {
    top: `${50 + Math.sin(angle) * (radius / 400) * 100}%`,
    left: `${50 + Math.cos(angle) * (radius / 400) * 100}%`,
    transform: 'translate(-50%, -50%)',
  }
}

const tooltipStyle = computed(() => {
  return {
    left: '20px',
    top: '20px',
  }
})

onMounted(async () => {
  // Dynamic background load
  const loadScript = (src) =>
    new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      document.body.appendChild(s)
    })

  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
  await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js')

  vantaEffect = window.VANTA.NET({
    el: vantaRef.value,
    backgroundColor: 0x050510,
    color: 0x00fff0,
    points: 10.0,
    maxDistance: 20.0,
    spacing: 18.0,
    showDots: true,
    mouseControls: true,
    scale: 1.0,
    scaleMobile: 1.0,
  })

  // Try API first; fall back to local projects.json for dev/demo
  try {
    const api = await axios.get('/api/projects')
    if (Array.isArray(api.data) && api.data.length) {
      projects.value = api.data.map(p => ({
        id: p.id,
        title: p.title,
        year: new Date(p.created_at).getFullYear(),
        tech: [],
        image: p.image_url || '',
        description: p.description,
        github: p.github_url || '', // Add this field to your backend if needed
      }))
    } else {
      throw new Error('Empty API response')
    }
  } catch (err) {
    try {
      const response = await axios.get('/src/data/projects.json')
      projects.value = response.data
    } catch (fallbackErr) {
      console.error('Error loading projects:', fallbackErr)
    }
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>
    points: 10.0,
    maxDistance: 20.0,
    spacing: 18.0,
    showDots: true,
    mouseControls: true,
    scale: 1.0,
    scaleMobile: 1.0,
  })

  // Try API first; fall back to local projects.json for dev/demo
  try {
    const api = await axios.get('/api/projects')
    if (Array.isArray(api.data) && api.data.length) {
      projects.value = api.data.map(p => ({
        id: p.id,
        title: p.title,
        year: new Date(p.created_at).getFullYear(),
        tech: [],
        image: p.image_url || '',
        description: p.description,
      }))
    } else {
      throw new Error('Empty API response')
    }
  } catch (err) {
    try {
      const response = await axios.get('/src/data/projects.json')
      projects.value = response.data
    } catch (fallbackErr) {
      console.error('Error loading projects:', fallbackErr)
    }
  }

  await nextTick()
  revealOnScroll()
  animateCursor()
})

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  document.querySelectorAll('.project-card').forEach((el) => observer.observe(el))
}

function animateCursor() {
  const halo = document.getElementById('cursor-halo')
  document.addEventListener('mousemove', (e) => {
    if (!halo) return
    halo.style.left = `${e.clientX - halo.offsetWidth / 2}px`
    halo.style.top = `${e.clientY - halo.offsetHeight / 2}px`
  })
}

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

.project-card {
  will-change: transform, opacity;
  transform-style: preserve-3d;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

/* gradient hue rotation */
@keyframes gradientShift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.animate-gradientShift { animation: gradientShift 40s linear infinite; }

html { scroll-behavior: smooth; }
</style>
