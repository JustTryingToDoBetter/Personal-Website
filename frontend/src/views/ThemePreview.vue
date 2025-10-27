<template>
  <!-- root: full cyberpunk scene -->
  <div
    ref="vantaRef"
    class="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center text-white"
  >
    <!-- gradient lighting layer -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#FF007A]/10 via-[#00FFF0]/10 to-[#250045]/10 animate-gradientShift z-0"
    ></div>

    <!-- cursor halo -->
    <div
      id="cursor-halo"
      class="pointer-events-none fixed w-52 h-52 rounded-full bg-cyan-400/10 blur-3xl mix-blend-screen"
    ></div>

    <!-- content -->
    <div class="z-10 space-y-6 select-none">
      <h1
        ref="titleEl"
        class="text-7xl font-orbitron tracking-[0.25em] text-cyan-300 neon-title holographic-text"
      >
        Jaydin Morrison
      </h1>

      <p
        ref="subtitleEl"
        class="text-[#9AA0B8] text-lg tracking-widest uppercase"
      >
        Echoes Among Code & Cosmos
      </p>

      <button
        ref="buttonEl"
        class="relative mt-4 px-10 py-4 uppercase text-sm tracking-widest border-2 border-cyan-400
               text-cyan-300 font-semibold rounded-md overflow-hidden hover:scale-110 transition-all duration-300
               shadow-[0_0_15px_#00fff0] before:absolute before:inset-0 before:bg-cyan-400/20 hover:before:bg-cyan-400/30"
      >
        Enter the Network
      </button>
    </div>
  </div>
</template>

<script setup>
/*
  Production version
  ------------------
  - Uses @vueuse/motion composable (no <Motion> components).
  - Keeps all effects: gradient lighting, cursor halo, holographic refraction.
  - Animates hero elements with useMotion().
*/

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useMotion } from '@vueuse/motion'

const vantaRef = ref(null)
const titleEl = ref(null)
const subtitleEl = ref(null)
const buttonEl = ref(null)
let vantaEffect = null

onMounted(async () => {
  // dynamic load for Vanta + Three
  const loadScript = (src) =>
    new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      document.body.appendChild(s)
    })

  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
  await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js')

  // initialize background network
  vantaEffect = window.VANTA.NET({
    el: vantaRef.value,
    backgroundColor: 0x050510,
    color: 0x00fff0,
    points: 12.0,
    maxDistance: 25.0,
    spacing: 18.0,
    showDots: true,
    mouseControls: true,
    touchControls: true,
    scale: 1.0,
    scaleMobile: 1.0
  })

  // cursor halo effect
  const halo = document.getElementById('cursor-halo')
  document.addEventListener('mousemove', (e) => {
    halo.style.left = `${e.clientX - halo.offsetWidth / 2}px`
    halo.style.top = `${e.clientY - halo.offsetHeight / 2}px`
  })

  // entry animations using useMotion()
  useMotion(titleEl, {
    initial: { opacity: 0, y: 80 },
    enter: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3 } }
  })

  useMotion(subtitleEl, {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.6 } }
  })

  useMotion(buttonEl, {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9 } }
  })

  // holographic title motion: mouse refraction + color drift
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 2
    const y = (e.clientY / innerHeight - 0.5) * 2
    const rotateX = y * 10
    const rotateY = -x * 10
    const title = titleEl.value
    title.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    title.style.textShadow = `
      ${x * 10}px ${y * 10}px 20px #00fff0,
      ${-x * 10}px ${-y * 10}px 30px #ff007a`
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

/* gradient layer hue rotation */
@keyframes gradientShift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.animate-gradientShift { animation: gradientShift 25s linear infinite; }

/* main neon pulse */
.neon-title {
  animation: pulseGlow 3s infinite alternate;
}
@keyframes pulseGlow {
  0% { text-shadow: 0 0 10px #00fff0, 0 0 20px #00fff0, 0 0 40px #ff007a; }
  100% { text-shadow: 0 0 25px #ff007a, 0 0 50px #ff007a, 0 0 75px #00fff0; }
}

/* holographic refraction behavior */
.holographic-text {
  transition: transform 0.3s ease-out, text-shadow 0.3s ease-out;
  will-change: transform, text-shadow;
}
</style>
