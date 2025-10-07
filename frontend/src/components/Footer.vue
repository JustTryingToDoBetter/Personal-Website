<template>
  <footer class="bg-gray-800 text-white py-6 mt-12">
    <div class="container mx-auto px-4 text-center">
      <p>
        &copy; {{ year }} Jaydin Morrison. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>