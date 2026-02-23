<template>
  <Section class-name="pt-14 md:pt-20">
    <h1 class="font-display text-4xl text-white sm:text-5xl">Blog</h1>
    <p class="mt-3 max-w-2xl text-gray-400">
      Notes on engineering decisions, delivery patterns, and lessons from shipped systems.
    </p>

    <div class="prose prose-invert mt-8 max-w-none">
      <div class="space-y-4">
        <Card v-for="post in posts" :key="post.slug">
          <p class="font-mono text-xs uppercase tracking-wide text-gray-400">
            {{ formatDate(post.date) }}
          </p>
          <h2 class="mt-1 font-display text-2xl text-white">{{ post.title }}</h2>
          <p class="mt-2 text-sm text-gray-400">{{ post.excerpt }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <Badge v-for="tag in post.tags" :key="`${post.slug}-${tag}`">{{ tag }}</Badge>
          </div>
        </Card>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from '@/components/layout/Section.vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import { posts } from '@/data/posts'

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
</script>
