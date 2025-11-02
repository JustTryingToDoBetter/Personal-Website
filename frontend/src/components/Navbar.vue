<template>
  <nav class="bg-white dark:bg-gray-900 shadow border-b border-gray-100 dark:border-gray-800">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">
        Jaydin Morrison
      </router-link>
      <button
        class="md:hidden p-2 focus:outline-none"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle navigation"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex items-center gap-4">
        <ul
          :class="[menuOpen ? 'block' : 'hidden', 'md:flex space-y-4 md:space-y-0 md:space-x-6']"
          class="absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent shadow md:shadow-none p-4 md:p-0"
        >
          <li><router-link to="/" class="hover:underline">Home</router-link></li>
          <li><router-link to="/projects" class="hover:underline">Projects</router-link></li>
          <li><router-link to="/about" class="hover:underline">About</router-link></li>
          <li><router-link to="/contact" class="hover:underline">Contact</router-link></li>
        </ul>
        <button
          class="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
          <span class="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuOpen: false,
      isDark: document.documentElement.classList.contains('dark'),
    }
  },
  watch: {
    // Close the menu whenever the route changes
    $route() {
      this.menuOpen = false
    },
  },
  methods: {
    toggleTheme() {
      const root = document.documentElement
      this.isDark = !this.isDark
      root.classList.toggle('dark', this.isDark)
      try {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      } catch (e) {}
    },
  },
}
</script>