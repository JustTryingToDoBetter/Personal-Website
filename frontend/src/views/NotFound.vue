<template>
  <div class="container mx-auto px-4 py-24 text-center">
    <h1 class="text-5xl font-extrabold mb-4">404</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
      Oops! The page you're looking for doesn't exist.
    </p>
    <router-link
      to="/"
      class="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Go Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
