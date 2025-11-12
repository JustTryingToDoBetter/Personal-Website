<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <section class="py-20 container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold dark:text-white">Latest Articles</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-3">Thoughts, tutorials, and case studies about web dev, AI/ML and 3D graphics.</p>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <article v-for="post in posts" :key="post.slug" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <div class="text-3xl">{{ post.emoji || '✍️' }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }} • {{ post.readingTime }}min</div>
              </div>

              <h2 class="text-xl font-semibold mb-2 dark:text-white">{{ post.title }}</h2>
              <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{{ post.excerpt }}</p>

              <div class="flex items-center justify-between">
                <router-link :to="`/blog/${post.slug}`" class="text-cyan-600 dark:text-cyan-400 font-semibold">Read article →</router-link>
                <div class="flex gap-2">
                  <span v-for="tag in post.tags" :key="tag" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200">{{ tag }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-if="!posts.length" class="text-center py-20 text-gray-600 dark:text-gray-400">
          No posts yet — check back soon.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([])

// Load all markdown posts (raw) using Vite import.meta.glob
const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const fm = { }
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { front: {}, body: raw }
  const frontRaw = match[1]
  const body = raw.slice(match[0].length)
  frontRaw.split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    // parse tags comma separated
    if (key === 'tags') {
      val = val.replace(/\[|\]|\s+/g, '')
      fm[key] = val ? val.split(',') : []
    } else {
      fm[key] = val
    }
  })
  return { front: fm, body }
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

for (const path in modules) {
  const raw = modules[path]
  const { front, body } = parseFrontmatter(raw)
  const slug = path.split('/').pop().replace('.md','')
  const excerpt = front.excerpt || body.split('\n\n')[0].replace(/\n/g, ' ').slice(0, 180)
  const readingTime = estimateReadingTime(body)
  posts.value.push({
    slug,
    title: front.title || slug,
    date: front.date || '',
    tags: front.tags || [],
    emoji: front.emoji || '',
    excerpt,
    readingTime,
  })
}

// sort by date desc if available
posts.value.sort((a,b) => (b.date || '').localeCompare(a.date || ''))
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>