<template>
  <div
    ref="vantaRef"
    class="relative w-screen min-h-screen overflow-x-hidden overflow-y-auto text-white snap-y snap-mandatory"
  >
    <!-- Dimmed Vanta background -->
    <div class="absolute inset-0 z-0"></div>

    <div class="absolute inset-0 bg-black/50 z-1"></div>

    <!-- Cursor halo -->
    <div
      id="cursor-halo"
      class="pointer-events-none fixed w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl mix-blend-screen"
    ></div>

    <!-- Projects timeline -->
    <div class="relative z-10 flex flex-col items-center space-y-32 py-32">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        :class="[
          'snap-center w-3/4 md:w-2/3 lg:w-1/2 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/30 shadow-[0_0_25px_#00fff066]',
          'transition-transform duration-1000 ease-out opacity-0 translate-y-20 project-card'
        ]"
      >
        <div class="flex flex-col items-center space-y-4">
          <img
            v-if="project.image"
            :src="project.image"
            alt=""
            class="rounded-lg w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
          />
          <h2 class="text-3xl font-orbitron text-cyan-300">
            {{ project.title }}
          </h2>
          <p class="text-[#9AA0B8] italic">{{ project.year }}</p>
          <div class="flex gap-3 text-sm uppercase tracking-widest">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md border border-cyan-500/30"
            >
              {{ tech }}
            </span>
          </div>
          <p class="text-[#C7D1E3] leading-relaxed mt-3">
            {{ project.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'

const vantaRef = ref(null)
const projects = ref([])
let vantaEffect = null

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
