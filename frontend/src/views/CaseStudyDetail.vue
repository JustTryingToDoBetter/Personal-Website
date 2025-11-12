<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div v-if="!study && !loading" class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-2xl font-bold mb-2 dark:text-white">Case Study Not Found</h2>
      <router-link to="/case-studies" class="text-cyan-600 dark:text-cyan-400">← Back to Case Studies</router-link>
    </div>

    <div v-if="loading" class="container mx-auto px-4 py-12 max-w-5xl">
      <div class="animate-pulse space-y-6">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>

    <article v-if="study && !loading" class="container mx-auto px-4 py-12 max-w-5xl">
      <!-- Back Button -->
      <router-link to="/case-studies" class="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline mb-8">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Case Studies
      </router-link>

      <!-- Header -->
      <header class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-6xl">{{ study.emoji }}</span>
          <div>
            <div class="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">{{ study.category }}</div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">{{ study.title }}</h1>
          </div>
        </div>
        
        <p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {{ study.summary }}
        </p>

        <!-- Key Metrics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl">
          <div v-for="metric in study.metrics" :key="metric.label">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ metric.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ metric.label }}</div>
          </div>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 font-medium transition-all border-b-2',
            activeTab === tab
              ? 'text-cyan-600 dark:text-cyan-400 border-cyan-600'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="prose dark:prose-invert max-w-none">
        <!-- Overview -->
        <section v-show="activeTab === 'Overview'" class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🎯 The Challenge</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ study.challenge }}</p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💡 The Solution</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ study.solution }}</p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🚀 Key Features</h2>
            <ul class="space-y-2">
              <li v-for="feature in study.features" :key="feature" class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span class="text-green-500 mt-1">✓</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Technical Details -->
        <section v-show="activeTab === 'Technical'" class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🏗️ Architecture</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{{ study.architecture }}</p>
            <div v-if="study.architectureDiagram" class="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl text-center">
              <img :src="study.architectureDiagram" alt="Architecture Diagram" class="max-w-full mx-auto" />
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">⚙️ Tech Stack</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="(techs, category) in study.techStack" :key="category" class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ category }}</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in techs" :key="tech" class="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="study.codeSnippets">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💻 Code Highlights</h2>
            <div v-for="snippet in study.codeSnippets" :key="snippet.title" class="mb-6">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ snippet.title }}</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{{ snippet.code }}</code></pre>
            </div>
          </div>
        </section>

        <!-- Process -->
        <section v-show="activeTab === 'Process'" class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">📅 Timeline</h2>
            <div class="space-y-4">
              <div v-for="(phase, index) in study.timeline" :key="index" class="flex gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < study.timeline.length - 1" class="w-0.5 h-full bg-gray-300 dark:bg-gray-700 my-2"></div>
                </div>
                <div class="flex-1 pb-8">
                  <div class="font-bold text-gray-900 dark:text-white mb-1">{{ phase.phase }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ phase.duration }}</div>
                  <p class="text-gray-700 dark:text-gray-300">{{ phase.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Results -->
        <section v-show="activeTab === 'Results'" class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📈 Outcomes & Impact</h2>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div v-for="result in study.results" :key="result.metric" class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{{ result.value }}</div>
                <div class="font-medium text-gray-900 dark:text-white mb-1">{{ result.metric }}</div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ result.description }}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🎓 Lessons Learned</h2>
            <div class="space-y-3">
              <div v-for="lesson in study.lessons" :key="lesson" class="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <span class="text-2xl">💡</span>
                <p class="text-gray-700 dark:text-gray-300">{{ lesson }}</p>
              </div>
            </div>
          </div>

          <div v-if="study.testimonial">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">💬 Client Feedback</h2>
            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border-l-4 border-purple-500">
              <p class="text-gray-700 dark:text-gray-300 italic mb-4">"{{ study.testimonial.quote }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold">
                  {{ study.testimonial.initials }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ study.testimonial.name }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ study.testimonial.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer CTA -->
      <div class="mt-16 p-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Interested in Similar Solutions?</h3>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Let's discuss how we can apply these learnings to solve your challenges.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/contact"
            class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-xl transition-all"
          >
            Get in Touch
          </router-link>
          <router-link
            to="/case-studies"
            class="px-6 py-3 bg-blue-500/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30"
          >
            View More Case Studies
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const studyId = route.params.id
const loading = ref(true)
const study = ref(null)
const activeTab = ref('Overview')
const tabs = ['Overview', 'Technical', 'Process', 'Results']

// Sample data - replace with actual data from JSON or API
const caseStudiesData = {
  'football-tracking': {
    id: 'football-tracking',
    title: 'AI-Powered Football Player Tracking System',
    emoji: '⚽',
    category: 'AI/ML • Computer Vision',
    summary: 'Developed a real-time player tracking system using YOLOv8 and DeepSORT to analyze football matches, achieving 92% detection accuracy and processing at 81 FPS for professional sports analytics.',
    challenge: 'Traditional manual video analysis is time-consuming and error-prone. Coaches needed an automated system to track player movements, analyze formations, and extract performance metrics in real-time during matches.',
    solution: 'Built an end-to-end computer vision pipeline combining YOLOv8 for player detection with DeepSORT for multi-object tracking. Optimized with TensorRT for real-time performance, deployed as a web service with FastAPI backend.',
    features: [
      'Real-time player detection and tracking across video frames',
      'Team identification using color clustering algorithms',
      'Heatmap generation for player positioning analysis',
      'Speed and distance metrics calculation',
      'Formation recognition and tactical analysis',
      'Export data to CSV/JSON for further analysis'
    ],
    metrics: [
      { label: 'Detection Accuracy', value: '92%' },
      { label: 'Processing Speed', value: '81 FPS' },
      { label: 'Duration', value: '4 months' },
      { label: 'Team Size', value: '2' }
    ],
    architecture: 'The system follows a modular architecture with three main components: (1) Video Ingestion module for preprocessing and frame extraction, (2) Detection & Tracking Engine using YOLOv8 + DeepSORT, and (3) Analytics & Visualization Dashboard built with React. Communication between modules uses Redis for caching and RabbitMQ for async processing.',
    techStack: {
      'ML/AI': ['YOLOv8', 'DeepSORT', 'TensorRT', 'PyTorch'],
      'Backend': ['FastAPI', 'Python', 'Redis', 'PostgreSQL'],
      'Computer Vision': ['OpenCV', 'Roboflow', 'NumPy'],
      'Deployment': ['Docker', 'NGINX', 'AWS EC2']
    },
    timeline: [
      { phase: 'Research & Dataset Collection', duration: '2 weeks', description: 'Collected and annotated 5,000+ frames from various football matches' },
      { phase: 'Model Training', duration: '3 weeks', description: 'Trained YOLOv8 model, experimented with hyperparameters, achieved 92% mAP' },
      { phase: 'Tracking Integration', duration: '3 weeks', description: 'Integrated DeepSORT, tuned tracking parameters, handled occlusions' },
      { phase: 'Optimization & Deployment', duration: '4 weeks', description: 'TensorRT optimization, API development, deployment pipeline' },
      { phase: 'Testing & Refinement', duration: '2 weeks', description: 'End-to-end testing, bug fixes, performance tuning' }
    ],
    results: [
      { metric: 'Detection Accuracy', value: '92.4%', description: 'mAP@50 on test dataset' },
      { metric: 'Processing Speed', value: '81.3 FPS', description: 'Real-time inference with TensorRT' },
      { metric: 'Tracking Consistency', value: '87%', description: 'ID switches reduced by 60%' },
      { metric: 'Analysis Time', value: '-85%', description: 'Reduced from 4 hours to 40 minutes' }
    ],
    lessons: [
      'Data quality matters more than quantity - spent 40% of time on dataset curation and annotation',
      'TensorRT optimization provided 3.5x speedup, critical for real-time requirements',
      'DeepSORT parameter tuning (max_age, n_init) significantly improved tracking consistency',
      'Modular architecture enabled parallel development and easier debugging'
    ]
  }
}

onMounted(() => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    study.value = caseStudiesData[studyId] || null
    loading.value = false
  }, 500)
})
</script>

<style scoped>
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
  font-size: 0.875rem;
}
</style>
