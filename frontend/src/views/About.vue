<template>
  <Section class-name="pt-14 md:pt-20">
    <h1 class="font-display text-4xl text-white sm:text-5xl">About</h1>
    <p class="mt-4 max-w-3xl text-gray-400">
      I build practical software that scales under real usage. My work spans full-stack product
      development, computer vision systems, and secure API delivery.
    </p>

    <Divider />

    <div class="grid gap-6 lg:grid-cols-3">
      <Card>
        <h2 class="font-display text-2xl text-white">Background</h2>
        <p class="mt-3 text-sm text-gray-400">
          Hands-on engineer focused on outcomes: uptime, performance, maintainability, and user
          clarity.
        </p>
      </Card>
      <Card>
        <h2 class="font-display text-2xl text-white">Skills</h2>
        <div class="mt-3 flex flex-wrap gap-2">
          <Badge>Vue</Badge>
          <Badge>Django</Badge>
          <Badge>FastAPI</Badge>
          <Badge>PostgreSQL</Badge>
          <Badge>Docker</Badge>
          <Badge>PyTorch</Badge>
        </div>
      </Card>
      <Card>
        <h2 class="font-display text-2xl text-white">Values</h2>
        <ul class="mt-3 space-y-2 text-sm text-gray-400">
          <li>Build simple systems first.</li>
          <li>Measure before optimizing.</li>
          <li>Prefer secure defaults.</li>
        </ul>
      </Card>
    </div>
  </Section>
</template>

<script setup>
import Section from '@/components/layout/Section.vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import Divider from '@/components/ui/Divider.vue'
</script>
