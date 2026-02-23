<template>
  <footer class="border-t border-gray-600/40 py-8">
    <Container>
      <div class="flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} Jaydin Morrison</p>
        <p class="font-mono text-xs uppercase tracking-wide">Built with Vue + Tailwind</p>
      </div>
    </Container>
  </footer>
</template>

<script setup>
import Container from '@/components/layout/Container.vue'

const year = new Date().getFullYear()
</script>
