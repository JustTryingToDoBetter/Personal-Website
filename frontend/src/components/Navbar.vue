<template>
  <nav class="bg-white shadow">
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
      <ul
        :class="[menuOpen ? 'block' : 'hidden', 'md:flex space-y-4 md:space-y-0 md:space-x-6']"
        class="absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none p-4 md:p-0"
      >
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li><router-link to="/projects" class="hover:underline">Projects</router-link></li>
        <li><router-link to="/about" class="hover:underline">About</router-link></li>
        <li><router-link to="/contact" class="hover:underline">Contact</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuOpen: false,
    }
  },
  watch: {
    // Close the menu whenever the route changes
    $route() {
      this.menuOpen = false
    },
  },
}
</script>