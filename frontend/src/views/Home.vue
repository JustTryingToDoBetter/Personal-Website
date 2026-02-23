<template>
  <Section class-name="pt-16 md:pt-24">
    <div class="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-end">
      <div>
        <p class="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
          Software Engineer
        </p>
        <h1 class="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Building reliable products with clean systems and fast iteration.
        </h1>
        <p class="mt-5 max-w-2xl text-base text-gray-400 sm:text-lg">
          I focus on full-stack applications, ML-enabled workflows, and production performance.
          This site highlights selected work and current priorities.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <Button to="/projects">View Projects</Button>
          <Button to="/contact" variant="secondary">Contact</Button>
        </div>
      </div>
      <Card>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">Now</p>
        <h2 class="mt-3 font-display text-2xl text-white">Building</h2>
        <ul class="mt-4 space-y-3 text-sm text-gray-400">
          <li>Production monitoring patterns for ML pipelines.</li>
          <li>Security-focused API hardening for internal tools.</li>
          <li>Lean UI systems for portfolio and client projects.</li>
        </ul>
      </Card>
    </div>
  </Section>

  <Section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <h2 class="font-display text-3xl text-white">Featured Projects</h2>
      <Link to="/projects">See all projects</Link>
    </div>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card v-for="project in featuredProjects" :key="project.id">
        <p class="font-mono text-xs uppercase tracking-wide text-red-500">{{ project.category }}</p>
        <h3 class="mt-2 font-display text-xl text-white">{{ project.title }}</h3>
        <p class="mt-3 text-sm text-gray-400">{{ project.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <Badge v-for="item in project.stack.slice(0, 3)" :key="item">{{ item }}</Badge>
        </div>
      </Card>
    </div>
  </Section>
</template>

<script setup>
import Section from '@/components/layout/Section.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Link from '@/components/ui/Link.vue'
import { projects } from '@/data/projects'

const featuredProjects = projects.filter((project) => project.featured).slice(0, 6)
</script>
