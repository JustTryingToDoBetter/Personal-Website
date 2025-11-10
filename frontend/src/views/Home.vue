<template>
  <div class="relative overflow-hidden min-h-screen dark:text-white">
    <!-- Dynamic Hero Section with Animated Background -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950">
      <!-- Animated Particles Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="stars-container">
          <div v-for="n in 100" :key="n" 
               class="star"
               :style="{
                 left: Math.random() * 100 + '%',
                 top: Math.random() * 100 + '%',
                 animationDelay: Math.random() * 3 + 's',
                 animationDuration: (Math.random() * 3 + 2) + 's'
               }"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="max-w-5xl mx-auto">
          <!-- Greeting Animation -->
          <div class="mb-6 animate-fade-in-down">
            <span class="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-purple-200 text-sm font-semibold border border-white/20">
              👋 Hey Hey Hey! Welcome to my universe
            </span>
          </div>

          <!-- Main Title -->
          <h1 class="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in-up">
            <span class="block text-white mb-2">Jaydin Morrison</span>
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
              {{ currentRole }}
            </span>
          </h1>

          <!-- Tagline -->
          <p class="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            22-year-old developer crafting <span class="text-cyan-400 font-semibold">immersive digital experiences</span> 
            at the intersection of <span class="text-pink-400 font-semibold">creativity</span> and <span class="text-purple-400 font-semibold">technology</span>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up">
            <router-link
              to="/projects"
              class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </router-link>
            <router-link
              to="/contact"
              class="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Let's Collaborate
            </router-link>
            <router-link
              to="/about"
              class="px-8 py-4 bg-purple-500/20 backdrop-blur-md text-white font-semibold rounded-full border-2 border-purple-400/50 hover:bg-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              About Me
            </router-link>
          </div>

          <!-- Stats Counter -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div v-for="stat in stats" :key="stat.label" 
                 class="stat-card p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-default">
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {{ stat.value }}{{ stat.suffix }}
              </div>
              <div class="text-purple-200 text-sm md:text-base">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Tech Stack Showcase -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 dark:text-white">
            <span class="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Tech Stack Universe
            </span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Technologies I work with to build amazing experiences
          </p>
        </div>

        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            <div v-for="tech in technologies" :key="tech.name"
                 class="group relative p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer flex flex-col items-center justify-center"
                 :title="tech.name">
              <div class="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {{ tech.icon }}
              </div>
              <div class="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                {{ tech.name }}
              </div>
              <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"
                   :style="{ background: tech.gradient }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Projects Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 dark:text-white">
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Explore my cosmic portfolio of work
          </p>
        </div>

        <div v-if="projects.length" class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          <article
            v-for="project in projects.slice(0, 4)"
            :key="project.id"
            class="group relative p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="relative z-10">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-2xl font-bold dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {{ project.title }}
                </h3>
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
              </div>
              
              <p class="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                {{ project.description }}
              </p>
              
              <router-link
                :to="`/projects/${project.id}`"
                class="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold group-hover:gap-3 transition-all"
              >
                <span>View Project</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </article>
        </div>

        <div class="text-center">
          <router-link
            to="/projects"
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>View All Projects</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 dark:text-white">
            <span class="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Testimonials from colleagues and collaborators
          </p>
        </div>

        <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name"
               class="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
            <!-- Stars -->
            <div class="flex gap-1 mb-4">
              <svg v-for="n in 5" :key="n" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {{ testimonial.initials }}
              </div>
              <div>
                <div class="font-semibold dark:text-white">{{ testimonial.name }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts Preview -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 dark:text-white">
            <span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Latest Insights
            </span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Thoughts on tech, development, and innovation
          </p>
        </div>

        <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          <article v-for="post in blogPosts" :key="post.id"
                   class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <!-- Featured Image -->
            <div class="h-48 bg-gradient-to-br overflow-hidden relative"
                 :style="{ background: post.gradient }">
              <div class="absolute inset-0 flex items-center justify-center text-6xl">
                {{ post.emoji }}
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
                  {{ post.category }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
              </div>
              
              <h3 class="text-xl font-bold mb-3 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {{ post.title }}
              </h3>
              
              <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {{ post.excerpt }}
              </p>
              
              <a href="#" class="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
                <span>Read More</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </article>
        </div>

        <div class="text-center">
          <a href="#" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
            <span>View All Articles</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA Section for Hiring/Collaboration -->
    <section class="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            Let's Build Something <span class="text-cyan-300">Epic</span> Together
          </h2>
          <p class="text-xl md:text-2xl mb-12 text-purple-100 leading-relaxed">
            I'm currently <span class="font-semibold text-green-300">open to opportunities</span> and collaborations. 
            Whether you need a developer for your team or want to bring an idea to life, let's connect!
          </p>

          <div class="flex flex-wrap justify-center gap-6 mb-12">
            <router-link
              to="/contact"
              class="group px-10 py-5 bg-white text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all duration-300 hover:scale-110 shadow-2xl flex items-center gap-3"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Hire Me</span>
            </router-link>
            
            <router-link
              to="/projects"
              class="px-10 py-5 bg-white/20 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/50 hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-2xl"
            >
              View My Work
            </router-link>
          </div>

          <!-- Contact Methods -->
          <div class="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/JustTryingToDoBetter" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            
            <a href="https://linkedin.com/in/jaydin-morrison" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            
            <a href="mailto:jaydin@example.com"
               class="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      currentRole: 'Full-Stack Developer',
      roles: [
        'Full-Stack Developer',
        'AI/ML Enthusiast',
        '3D Web Craftsman',
        'Problem Solver',
        'Creative Coder',
        'Tech Explorer'
      ],
      roleIndex: 0,
      stats: [
        { value: '10', suffix: '+', label: 'Projects Completed' },
        { value: '15', suffix: '+', label: 'Technologies Mastered' },
        { value: '2', suffix: '', label: 'Years Experience' },
        { value: '∞', suffix: '', label: 'Coffees Consumed ☕' }
      ],
      technologies: [
        { name: 'Vue.js', icon: '🟩', gradient: 'linear-gradient(135deg, #41b883 0%, #35495e 100%)' },
        { name: 'JavaScript', icon: '💛', gradient: 'linear-gradient(135deg, #f7df1e 0%, #000000 100%)' },
        { name: 'Python', icon: '🐍', gradient: 'linear-gradient(135deg, #3776ab 0%, #ffd343 100%)' },
        { name: 'Django', icon: '🎸', gradient: 'linear-gradient(135deg, #092e20 0%, #44b78b 100%)' },
        { name: 'Three.js', icon: '🎮', gradient: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)' },
        { name: 'TailwindCSS', icon: '💨', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
        { name: 'FastAPI', icon: '⚡', gradient: 'linear-gradient(135deg, #009688 0%, #4caf50 100%)' },
        { name: 'PostgreSQL', icon: '🐘', gradient: 'linear-gradient(135deg, #336791 0%, #8fbfe0 100%)' },
        { name: 'Docker', icon: '🐳', gradient: 'linear-gradient(135deg, #2496ed 0%, #0db7ed 100%)' },
        { name: 'Git', icon: '📦', gradient: 'linear-gradient(135deg, #f05032 0%, #ff6b6b 100%)' },
        { name: 'Node.js', icon: '🟢', gradient: 'linear-gradient(135deg, #339933 0%, #66cc66 100%)' },
        { name: 'YOLOv8', icon: '👁️', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' }
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          role: 'Senior Developer @ Maskew Miller',
          initials: 'SJ',
          quote: 'Jaydin brings incredible energy and creativity to every project. His 3D visualizations are mind-blowing!'
        },
        {
          name: 'Michael Chen',
          role: 'Tech Lead @ StartupXYZ',
          initials: 'MC',
          quote: 'Working with Jaydin was a pleasure. He delivered clean code and creative solutions ahead of schedule.'
        },
        {
          name: 'Emily Rodriguez',
          role: 'Project Manager @ Agency',
          initials: 'ER',
          quote: "At 21, Jaydin has the skills of someone twice his age. Can't wait to see what he builds next!"
        }
      ],
      blogPosts: [
        {
          id: 1,
          title: 'Building Immersive 3D Portfolios with Three.js',
          excerpt: 'A deep dive into creating stunning 3D web experiences using Three.js, TroisJS, and Vue 3...',
          category: 'Tutorial',
          date: 'Nov 8, 2025',
          emoji: '🌌',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          id: 2,
          title: 'YOLOv8 for Real-Time Object Detection',
          excerpt: 'How I built a football player tracking system using YOLOv8 and achieved 95% accuracy...',
          category: 'AI/ML',
          date: 'Nov 5, 2025',
          emoji: '⚽',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          id: 3,
          title: 'My Journey as a 21-Year-Old Developer',
          excerpt: 'Reflections on learning to code, securing my first internship, and embracing quantum computing...',
          category: 'Career',
          date: 'Nov 1, 2025',
          emoji: '🚀',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
      ]
    }
  },
  async created() {
    try {
      const res = await axios.get('/projects', { timeout: 4000 })
      this.projects = Array.isArray(res.data) ? res.data : []
      if (!this.projects.length) throw new Error('Empty list')
    } catch (e) {
      // Fallback to local data
      try {
        const localData = await import('@/data/projects.json')
        this.projects = localData.default || []
      } catch {
        this.projects = []
      }
    }

    // Start role rotation
    this.startRoleRotation()
  },
  methods: {
    startRoleRotation() {
      setInterval(() => {
        this.roleIndex = (this.roleIndex + 1) % this.roles.length
        this.currentRole = this.roles[this.roleIndex]
      }, 3000) // Change every 3 seconds
    }
  },
  beforeUnmount() {
    clearInterval(this.roleRotationInterval)
  }
}
</script>

<style scoped>
/* Animations */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out 0.4s both;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Stars Background */
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* Line Clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Stat Card Hover Effect */
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.stat-card:hover::before {
  width: 300px;
  height: 300px;
}
</style>
