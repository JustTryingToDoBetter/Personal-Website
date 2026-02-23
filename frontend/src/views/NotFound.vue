<template>
  <Section class-name="pt-24 md:pt-32">
    <div class="text-center">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-red-500">404</p>
      <h1 class="mt-3 font-display text-4xl text-white sm:text-5xl">Page Not Found</h1>
      <p class="mx-auto mt-4 max-w-xl text-gray-400">
        The page you requested does not exist or was moved during the latest frontend refactor.
      </p>
      <div class="mt-8">
        <Button to="/">Return Home</Button>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from '@/components/layout/Section.vue'
import Button from '@/components/ui/Button.vue'
</script>
