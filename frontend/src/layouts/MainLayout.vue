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

      <div class="flex items-center gap-8">
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
        
        <!-- Dark mode toggle -->
        <button
          class="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-600 hover:bg-gray-800/50 transition-colors"
          @click="toggleTheme"
          :aria-pressed="isDark ? 'true' : 'false'"
          aria-label="Toggle dark mode"
          title="Toggle theme"
        >
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/><path fill-rule="evenodd" d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.221 4.221a1 1 0 011.415 0l1.414 1.414a1 1 0 11-1.414 1.415L4.221 5.636a1 1 0 010-1.415zm12.729 12.728a1 1 0 011.415 0l1.414 1.415a1 1 0 01-1.414 1.414l-1.415-1.414a1 1 0 010-1.415zM2 13a1 1 0 100-2h-2a1 1 0 100 2h2zm22 0a1 1 0 100-2h-2a1 1 0 100 2h2zM4.221 19.778a1 1 0 010-1.415l1.414-1.414a1 1 0 111.414 1.414L5.636 19.78a1 1 0 01-1.415 0zm12.728-12.729a1 1 0 010-1.414l1.415-1.414a1 1 0 111.414 1.414l-1.414 1.414a1 1 0 01-1.415 0z" clip-rule="evenodd"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path d="M21.752 15.002A9.718 9.718 0 0112 21.75C6.615 21.75 2.25 17.385 2.25 12A9.75 9.75 0 0115.002 2.248a.75.75 0 01.073 1.5A8.25 8.25 0 1019.5 8.925a.75.75 0 011.5-.073c.102 2.08-.622 4.162-1.248 6.15z"/>
          </svg>
        </button>
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
import { onMounted, ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' }
]

function toggleTheme() {
  const root = document.documentElement
  isDark.value = !isDark.value
  root.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  } catch (e) {}
}

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
