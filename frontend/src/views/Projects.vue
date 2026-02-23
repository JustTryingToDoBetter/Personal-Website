<template>
  <Section class-name="pt-14 md:pt-20">
    <h1 class="font-display text-4xl text-white sm:text-5xl">Projects</h1>
    <p class="mt-3 max-w-2xl text-gray-400">
      Selected engineering work across web applications, machine learning, and security.
    </p>

    <div class="mt-8 flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="rounded-lg border px-3 py-1.5 text-sm transition-all duration-200"
        :class="
          activeFilter === filter
            ? 'border-red-500 text-red-500'
            : 'border-gray-600/60 text-gray-400 hover:border-white/60 hover:text-white'
        "
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card v-for="project in filteredProjects" :key="project.id" class-name="flex h-full flex-col">
        <div class="flex items-start justify-between gap-3">
          <h2 class="font-display text-xl text-white">{{ project.title }}</h2>
          <Badge>{{ project.category }}</Badge>
        </div>
        <p class="mt-3 flex-1 text-sm text-gray-400">{{ project.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <Badge v-for="item in project.stack" :key="item">{{ item }}</Badge>
        </div>
        <div class="mt-5 flex gap-3">
          <Link v-if="project.github" :href="project.github">Repository</Link>
          <Link v-if="project.demo" :href="project.demo">Live Demo</Link>
        </div>
      </Card>
    </div>
  </Section>
</template>

<script setup>
import { computed, ref } from 'vue'
import Section from '@/components/layout/Section.vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import Link from '@/components/ui/Link.vue'
import { projects } from '@/data/projects'

const filters = ['All', 'Web', 'ML', 'Security']
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  return projects.filter((project) => project.category === activeFilter.value)
})
</script>
