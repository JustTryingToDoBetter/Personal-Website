<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <section class="container mx-auto px-4 py-12 max-w-4xl">
      <div v-if="!post && !loading" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold mb-2 dark:text-white">Article not found</h2>
        <p class="text-gray-600 dark:text-gray-400">The article doesn't exist or was removed.</p>
      </div>

      <div v-if="loading" class="animate-pulse space-y-6">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <article v-if="post && !loading" class="prose dark:prose-invert max-w-none">
        <div class="mb-4">
          <router-link to="/blog" class="text-cyan-600 dark:text-cyan-400">← Back to articles</router-link>
        </div>

        <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
        <div class="flex items-center gap-4 mb-6 text-gray-600 dark:text-gray-400">
          <div class="text-2xl">{{ post.emoji || '✍️' }}</div>
          <div>{{ post.date }} • {{ post.readingTime }} min read</div>
          <div class="ml-auto flex gap-2">
            <a :href="shareUrl('twitter')" target="_blank" class="text-blue-400">Twitter</a>
            <a :href="shareUrl('linkedin')" target="_blank" class="text-blue-600">LinkedIn</a>
          </div>
        </div>

        <div v-html="htmlBody"></div>

        <section class="mt-12">
          <h3 class="text-xl font-bold mb-3">Tags</h3>
          <div class="flex gap-2 flex-wrap">
            <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">{{ tag }}</span>
          </div>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
// Import common language support
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markdown'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</code></pre>`
      } catch (e) {
        console.error(e)
      }
    }
    return `<pre class="language-${lang || 'text'}"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

const route = useRoute()
const slug = route.params.slug
const loading = ref(true)
const post = ref(null)
const htmlBody = ref('')

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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
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

function shareUrl(network) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(post.value?.title || '')
  if (network === 'twitter') return `https://twitter.com/intent/tweet?text=${title}&url=${url}`
  if (network === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  return '#'
}

onMounted(async () => {
  loading.value = true
  try {
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true })
    const key = Object.keys(modules).find(p => p.endsWith(`${slug}.md`))
    if (!key) {
      post.value = null
      return
    }
    const raw = modules[key]
    const { front, body } = parseFrontmatter(raw)
    post.value = {
      slug,
      title: front.title || slug,
      date: front.date || '',
      tags: front.tags || [],
      emoji: front.emoji || '',
      body
    }
    htmlBody.value = md.render(body)
    post.value.readingTime = estimateReadingTime(body)
  } catch (e) {
    console.error(e)
    post.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* Prism code blocks are already styled by prism-tomorrow.css */
/* Add any additional custom styling here */
pre[class*="language-"] {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow-x: auto;
}

code[class*="language-"] {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace;
}
</style>