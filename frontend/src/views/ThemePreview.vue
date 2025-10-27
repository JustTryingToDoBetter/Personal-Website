<template>
  <div
    ref="vantaRef"
    class="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center text-white"
  >
    <!-- Animated gradient lighting layer -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#FF007A]/10 via-[#00FFF0]/10 to-[#250045]/10 animate-gradientShift z-0"
    ></div>

    <!-- Cursor halo -->
    <div id="cursor-halo" class="pointer-events-none fixed w-52 h-52 rounded-full bg-cyan-400/10 blur-3xl mix-blend-screen"></div>

    <!-- Animated hero -->
    <motion.div
      class="z-10"
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.2, easing: 'easeOut' } }"
    >
      <motion.h1
        class="text-7xl font-orbitron tracking-[0.25em] mb-3 text-cyan-300 neon-title"
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 1 } }"
      >
        Jaydin Morrison
      </motion.h1>

      <motion.p
        class="text-[#9AA0B8] text-lg tracking-widest uppercase"
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.8 } }"
      >
        Echoes Among Code & Cosmos
      </motion.p>

      <motion.button
        class="relative mt-10 px-10 py-4 uppercase text-sm tracking-widest border-2 border-cyan-400
               text-cyan-300 font-semibold rounded-md overflow-hidden hover:scale-110 transition-all duration-300
               shadow-[0_0_15px_#00fff0] before:absolute before:inset-0 before:bg-cyan-400/20 hover:before:bg-cyan-400/30"
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 1.8, duration: 0.8 } }"
      >
        Enter the Network
      </motion.button>
    </motion.div>

    <!-- Floating orbs -->
    <div
      v-for="(orb, i) in 6"
      :key="i"
      class="absolute rounded-full blur-3xl mix-blend-screen animate-floatOrb"
      :style="{
        width: `${Math.random() * 200 + 150}px`,
        height: `${Math.random() * 200 + 150}px`,
        background: i % 2 === 0 ? 'rgba(0,255,240,0.1)' : 'rgba(255,0,122,0.08)',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${i * 2}s`
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MotionPlugin, motion } from '@vueuse/motion'

const vantaRef = ref(null)
let vantaEffect = null

onMounted(async () => {
  const load = src => new Promise(r => {
    const s = document.createElement('script')
    s.src = src
    s.onload = r
    document.body.appendChild(s)
  })
  await load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
  await load('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js')

  vantaEffect = window.VANTA.NET({
    el: vantaRef.value,
    backgroundColor: 0x050510,
    color: 0x00FFF0,
    points: 12.0,
    maxDistance: 25.0,
    spacing: 18.0,
    showDots: true,
    mouseControls: true,
    touchControls: true,
    scale: 1.0,
    scaleMobile: 1.0
  })

  // Cursor halo movement
  const halo = document.getElementById('cursor-halo')
  document.addEventListener('mousemove', e => {
    halo.style.left = `${e.clientX - halo.offsetWidth / 2}px`
    halo.style.top = `${e.clientY - halo.offsetHeight / 2}px`
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

/* === Keyframes === */
@keyframes gradientShift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes floatOrb {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.5; }
}

/* === Classes === */
.animate-gradientShift {
  animation: gradientShift 25s linear infinite;
}
.animate-floatOrb {
  animation: floatOrb 10s ease-in-out infinite;
}
.neon-title {
  animation: pulseGlow 3s infinite alternate;
}
@keyframes pulseGlow {
  0% { text-shadow: 0 0 10px #00fff0, 0 0 20px #00fff0, 0 0 40px #ff007a; }
  100% { text-shadow: 0 0 25px #ff007a, 0 0 50px #ff007a, 0 0 75px #00fff0; }
}
</style>
