<template>
  <div class="relative min-h-screen w-full text-white overflow-hidden font-sans bg-[#050510]">
    <!-- gradient lighting -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#FF007A]/10 via-[#00FFF0]/10 to-[#250045]/10 animate-gradientShift -z-10"
    ></div>

    <!-- global cursor halo -->
    <div
      id="cursor-halo"
      class="pointer-events-none fixed w-40 h-40 rounded-full bg-cyan-400/10 blur-3xl mix-blend-screen transition-transform duration-150 ease-out"
    ></div>

    <!-- nav -->
    <nav
      class="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-5 bg-transparent z-20 backdrop-blur-md"
    >
      <router-link
        to="/"
        class="text-xl font-orbitron text-white tracking-wide hover:text-cyan-300 transition-all duration-300"
      >
        Jaydin Morrison
      </router-link>

      <div class="flex gap-8 text-lg">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative group"
        >
          <span
            class="text-white/90 group-hover:text-cyan-300 transition-all duration-300"
          >
            {{ item.label }}
          </span>
          <span
            class="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"
          ></span>
        </router-link>
      </div>
    </nav>

    <!-- animated route outlet -->
    <main class="pt-28">
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
        <component :is="Component" />
        </transition>
    </router-view>
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// cursor halo follow logic
onMounted(() => {
  const halo = document.getElementById('cursor-halo')
  if (!halo) return
  document.addEventListener('mousemove', (e) => {
    halo.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

@keyframes gradientShift {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
.animate-gradientShift {
  animation: gradientShift 25s linear infinite;
}

/* route transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
