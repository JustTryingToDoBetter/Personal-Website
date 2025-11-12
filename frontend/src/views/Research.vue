<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-purple-200 text-sm font-semibold border border-white/20 mb-6">
            📚 Research & Publications
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            Academic Contributions
          </h1>
          <p class="text-xl text-purple-100 max-w-2xl mx-auto">
            Conference papers, research projects, and academic presentations exploring emerging technologies and innovative solutions.
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400">{{ publications.papers.length }}</div>
              <div class="text-purple-200 text-sm mt-1">Papers</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-pink-400">{{ totalCitations }}</div>
              <div class="text-purple-200 text-sm mt-1">Citations</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-purple-400">{{ publications.presentations.length }}</div>
              <div class="text-purple-200 text-sm mt-1">Presentations</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 rounded-full font-medium transition-all',
            selectedCategory === cat
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Conference Papers -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
        <span class="text-4xl">📄</span>
        Conference Papers
      </h2>
      
      <div class="grid gap-6 max-w-5xl mx-auto">
        <div
          v-for="paper in filteredPapers"
          :key="paper.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div class="p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span v-if="paper.featured" class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full">
                    ⭐ Featured
                  </span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
                    {{ paper.type }}
                  </span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full">
                    {{ paper.status }}
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ paper.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {{ paper.authors.join(', ') }}
                </p>
                <p class="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {{ paper.conference }} • {{ formatDate(paper.date) }}
                </p>
              </div>
              
              <div class="text-right">
                <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ paper.citations }}</div>
                <div class="text-xs text-gray-500">citations</div>
              </div>
            </div>

            <!-- Abstract -->
            <div class="mb-4">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ paper.abstract }}
              </p>
            </div>

            <!-- Keywords -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="keyword in paper.keywords"
                :key="keyword"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {{ keyword }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-3">
              <a
                v-if="paper.pdfUrl"
                :href="paper.pdfUrl"
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
              
              <a
                v-if="paper.doi"
                :href="`https://doi.org/${paper.doi}`"
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Publisher
              </a>
              
              <button
                @click="copyBibtex(paper)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Cite (BibTeX)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPapers.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No papers found</h3>
        <p class="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
      </div>
    </section>

    <!-- Presentations Section -->
    <section v-if="publications.presentations.length > 0" class="container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
        <span class="text-4xl">🎤</span>
        Presentations & Talks
      </h2>
      
      <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div
          v-for="presentation in publications.presentations"
          :key="presentation.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start gap-4">
            <div class="text-4xl">🎬</div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ presentation.title }}
              </h3>
              <p class="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                {{ presentation.event }} • {{ formatDate(presentation.date) }}
              </p>
              <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {{ presentation.description }}
              </p>
              
              <div class="flex gap-2">
                <a
                  v-if="presentation.slidesUrl"
                  :href="presentation.slidesUrl"
                  target="_blank"
                  class="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  View Slides →
                </a>
                <a
                  v-if="presentation.videoUrl"
                  :href="presentation.videoUrl"
                  target="_blank"
                  class="text-sm text-pink-600 dark:text-pink-400 hover:underline"
                >
                  Watch Video →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mt-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Interested in Collaboration?
        </h2>
        <p class="text-purple-100 mb-8 max-w-2xl mx-auto">
          I'm always open to discussing research opportunities, academic collaborations, or innovative project ideas.
        </p>
        <router-link
          to="/contact"
          class="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Get in Touch
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import publicationsData from '@/data/publications.json'

const publications = ref(publicationsData)
const selectedCategory = ref('All')

const categories = computed(() => {
  const cats = new Set(['All'])
  publications.value.papers.forEach(paper => {
    paper.categories?.forEach(cat => cats.add(cat))
  })
  return Array.from(cats)
})

const filteredPapers = computed(() => {
  if (selectedCategory.value === 'All') {
    return publications.value.papers
  }
  return publications.value.papers.filter(paper =>
    paper.categories?.includes(selectedCategory.value)
  )
})

const totalCitations = computed(() => {
  return publications.value.papers.reduce((sum, paper) => sum + (paper.citations || 0), 0)
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

function copyBibtex(paper) {
  const bibtex = `@inproceedings{morrison${paper.date.substring(0, 4)},
  title={${paper.title}},
  author={${paper.authors.join(' and ')}},
  booktitle={${paper.conference}},
  year={${paper.date.substring(0, 4)}},
  doi={${paper.doi}}
}`
  
  navigator.clipboard.writeText(bibtex).then(() => {
    alert('BibTeX citation copied to clipboard!')
  }).catch(err => {
    console.error('Failed to copy:', err)
  })
}
</script>

<style scoped>
/* Smooth animations */
.hover\:shadow-2xl {
  transition: box-shadow 0.3s ease;
}
</style>
