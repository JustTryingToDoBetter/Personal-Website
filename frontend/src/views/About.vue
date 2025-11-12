<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="absolute inset-0 bg-stars"></div>
      
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="max-w-4xl mx-auto text-center text-white">
          <!-- Avatar -->
          <div class="mb-8 flex justify-center">
            <div class="relative">
              <div class="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-6xl font-bold shadow-2xl ring-4 ring-white/30 hover:scale-105 transition-transform duration-300">
                JM
              </div>
              <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span class="text-white text-xs font-bold">21</span>
              </div>
            </div>
          </div>

          <h1 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Jaydin Morrison
          </h1>
          <p class="text-xl md:text-2xl mb-6 text-purple-100">
            Junior Software Developer | BSc Computer Science | Honours Student
          </p>
          
          <!-- Professional Summary -->
          <div class="max-w-2xl mx-auto mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <p class="text-lg leading-relaxed">
              An energetic and detail-oriented Computer Science graduate (BSc) and current Honours student from Cape Town, proficient in Python, C#, and modern web technologies. Seeking opportunities to apply strong problem-solving skills, quick learning ability, and academic knowledge to contribute to innovative software solutions.
            </p>
          </div>

          <!-- Social Links -->
          <div class="flex justify-center gap-6 mb-8">
            <a href="https://github.com/JustTryingToDoBetter" target="_blank" rel="noopener noreferrer" 
               class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 group">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/jaydin-morrison-3a382a221" target="_blank" rel="noopener noreferrer"
               class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 group">
              <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:jaydenmorrison2017@gmail.com"
               class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 group">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>

          <!-- Download Resume Button -->
          <button @click="downloadResume" 
                  class="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Resume
          </button>
        </div>
      </div>
    </section>

    <!-- Skills Constellation -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 dark:text-white">
          <span class="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Skills Galaxy
          </span>
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-16">
          My technical universe, organized by domain
        </p>

        <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Frontend -->
          <div class="skill-category group">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-400">
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4 dark:text-white">Frontend</h3>
              <div class="space-y-3">
                <div v-for="skill in skills.frontend" :key="skill.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000 skill-bar"
                         :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend -->
          <div class="skill-category group">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-400">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4 dark:text-white">Backend</h3>
              <div class="space-y-3">
                <div v-for="skill in skills.backend" :key="skill.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 skill-bar"
                         :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Databases -->
          <div class="skill-category group">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4 dark:text-white">Databases</h3>
              <div class="space-y-3">
                <div v-for="skill in skills.databases" :key="skill.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000 skill-bar"
                         :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Machine Learning -->
          <div class="skill-category group">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-400">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4 dark:text-white">Machine Learning</h3>
              <div class="space-y-3">
                <div v-for="skill in skills.ml" :key="skill.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000 skill-bar"
                         :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools & Frameworks -->
          <div class="skill-category group">
            <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-400">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4 dark:text-white">Tools & Frameworks</h3>
              <div class="space-y-3">
                <div v-for="skill in skills.tools" :key="skill.name">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 skill-bar"
                         :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 dark:text-white">
          <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Journey Timeline
          </span>
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-16">
          My professional voyage through the tech cosmos
        </p>

        <div class="max-w-4xl mx-auto">
          <!-- Timeline -->
          <div class="relative">
            <!-- Vertical Line -->
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500"></div>

            <!-- Timeline Items -->
            <div v-for="(item, index) in timeline" :key="index" class="relative mb-12 ml-20">
              <!-- Timeline Dot -->
              <div class="absolute -left-14 top-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                   :class="item.color"></div>
              
              <!-- Content -->
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4"
                   :class="item.borderColor">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold dark:text-white">{{ item.title }}</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.period }}</span>
                </div>
                <p class="text-purple-600 dark:text-purple-400 font-semibold mb-3">{{ item.organization }}</p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ item.description }}</p>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span v-for="tag in item.tags" :key="tag" 
                        class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 dark:text-white">
          <span class="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Education & Certifications
          </span>
        </h2>

        <div class="max-w-4xl mx-auto grid gap-6">
          <div v-for="edu in education" :key="edu.title" 
               class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-cyan-400">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold dark:text-white mb-1">{{ edu.title }}</h3>
                <p class="text-purple-600 dark:text-purple-400 font-semibold mb-2">{{ edu.institution }}</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ edu.period }}</p>
                <p class="text-gray-700 dark:text-gray-300">{{ edu.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Languages & Interests -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <!-- Languages -->
          <div>
            <h2 class="text-3xl font-bold mb-8 dark:text-white">
              <span class="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Languages
              </span>
            </h2>
            <div class="space-y-6">
              <div v-for="lang in languages" :key="lang.name" 
                   class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold text-lg dark:text-white">{{ lang.name }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ lang.level }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                       :style="{ width: lang.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interests -->
          <div>
            <h2 class="text-3xl font-bold mb-8 dark:text-white">
              <span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Beyond Code
              </span>
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="interest in interests" :key="interest.name"
                   class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <div class="text-3xl mb-2">{{ interest.icon }}</div>
                <h3 class="font-semibold dark:text-white mb-1">{{ interest.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ interest.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <section class="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 dark:text-white">
          <span class="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Achievements & Recognition
          </span>
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-16">
          Milestones in my journey
        </p>

        <div class="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="achievement in achievements" :key="achievement.title"
               class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="text-4xl mb-4">{{ achievement.icon }}</div>
            <h3 class="text-lg font-bold dark:text-white mb-2">{{ achievement.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ achievement.year }}</p>
            <p class="text-gray-700 dark:text-gray-300 text-sm">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
        <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          I'm always excited to collaborate on innovative projects and explore new opportunities in the ever-evolving tech landscape.
        </p>
        <div class="flex justify-center gap-4">
          <router-link to="/contact" 
                       class="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl">
            Get In Touch
          </router-link>
          <router-link to="/projects" 
                       class="px-8 py-4 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-400 transition-all hover:scale-105 shadow-xl">
            View Projects
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Skills Data
const skills = ref({
  frontend: [
    { name: 'HTML/CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 75 },
    { name: 'Vue.js', level: 70 },
    { name: 'RESTful APIs', level: 80 },
  ],
  backend: [
    { name: 'Python', level: 90 },
    { name: 'C#', level: 85 },
    { name: 'ASP.NET', level: 75 },
    { name: 'Flask', level: 80 },
    { name: 'Socket.io', level: 70 },
  ],
  databases: [
    { name: 'PostgreSQL', level: 75 },
    { name: 'MS Access', level: 70 },
    { name: 'SQL', level: 75 },
  ],
  ml: [
    { name: 'Python (ML)', level: 85 },
    { name: 'OpenCV', level: 80 },
    { name: 'DeepSORT', level: 75 },
    { name: 'ByteTrack', level: 70 },
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'Agile', level: 75 },
    { name: 'Unity (C#)', level: 70 },
    { name: '3Ds Max', level: 60 },
    { name: 'AR/VR', level: 65 },
  ],
})

// Timeline Data
const timeline = ref([
  {
    title: 'Private Mathematics Tutor',
    organization: 'Self-Employed, Cape Town',
    period: 'January 2024 - Present',
    description: 'Providing personalized tutoring for Grade 8-12 students. Planning and organizing tailored lessons, conducting online sessions via Google Meets, giving feedback to parents/students, assisting with exams and homework, and applying latest teaching techniques to ensure effective knowledge transfer.',
    tags: ['Teaching', 'Mathematics', 'Communication', 'Google Meets'],
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-500',
  },
  {
    title: 'Mathematics Tutor',
    organization: 'Numeric, Observatory',
    period: 'April 2023 - November 2024',
    description: 'Tutored a class of Grade 7 students. Structured lesson plans according to curriculum, sent lesson plans to program manager, ensured learner safety during after-school sessions, processed test results, and captured session data including attendance and behavior.',
    tags: ['Mathematics', 'Lesson Planning', 'Data Capture'],
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
  },
  {
    title: 'Garden Volunteer',
    organization: 'SEED, Rocklands Primary School',
    period: 'February 2017 - November 2021',
    description: 'Tended the school garden with daily maintenance tasks including weeding, plant bed maintenance, and planting vegetable seeds to ensure proper growth of vegetation.',
    tags: ['Community Service', 'Environmental Care'],
    color: 'bg-green-500',
    borderColor: 'border-green-500',
  },
])

// Education Data
const education = ref([
  {
    title: 'BSc Honours in Computer Science',
    institution: 'University of the Western Cape',
    period: '2025 (Current)',
    description: 'Coursework: Intro to AR and VR, Artificial Intelligence, Intro to 3Ds Max. Exploring advanced topics in computer graphics and artificial intelligence.',
  },
  {
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of the Western Cape',
    period: '2022 - 2024',
    description: 'Completed coursework in Business Analysis, Project Management, Databases, Networking, Machine Learning, Software Engineering, and Operating Systems.',
  },
  {
    title: 'Web Development BootCamp',
    institution: 'Udemy',
    period: '2024',
    description: 'Modules: HTML, CSS, JavaScript, APIs, Git. Comprehensive training in modern web development practices.',
  },
  {
    title: 'Grade 12 / Matric',
    institution: 'Mondale High School',
    period: '2021',
    description: 'Subjects: English HL, Afrikaans FAL, Pure Mathematics, Accounting, Life Sciences, Physical Science.',
  },
])

// Languages
const languages = ref([
  { name: 'English', level: 'Native', percentage: 100 },
  { name: 'Afrikaans', level: 'First Additional Language', percentage: 75 },
])

// Interests & Soft Skills
const interests = ref([
  { name: 'Problem-Solving', icon: '�', description: 'Analytical thinking & debugging' },
  { name: 'Communication', icon: '💬', description: 'Clear technical communication' },
  { name: 'Teamwork', icon: '🤝', description: 'Collaborative development' },
  { name: 'Hiking', icon: '🥾', description: 'Mountain trails & nature' },
  { name: 'Cinema', icon: '�', description: 'Film enthusiast' },
  { name: 'Coffee', icon: '☕', description: 'Coffee culture explorer' },
])

// Achievements
const achievements = ref([
  {
    title: 'Football Player Tracking System',
    icon: '⚽',
    year: '2024',
    description: 'Implemented and benchmarked DeepSORT and ByteTrack algorithms on SoccerNet data, analyzing MOTA and MOTP metrics.',
  },
  {
    title: 'BSc Computer Science Graduate',
    icon: '🎓',
    year: '2024',
    description: 'Successfully completed Bachelor\'s degree in Computer Science at University of the Western Cape.',
  },
  {
    title: 'Web Development BootCamp',
    icon: '�',
    year: '2024',
    description: 'Completed comprehensive web development training covering HTML, CSS, JavaScript, APIs, and Git.',
  },
  {
    title: 'Mathematics Tutor',
    icon: '📐',
    year: '2023-2024',
    description: 'Helped numerous students improve their understanding and performance in mathematics.',
  },
])

// Download Resume Function
const downloadResume = () => {
  // For now, create a simple alert - later connect to PDF generation
  alert('Resume download coming soon! For now, please contact me directly.')
  // TODO: Implement PDF generation with jsPDF or connect to backend endpoint
}

// Animate skill bars on mount
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-width')
      }
    })
  })

  document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.setAttribute('data-width', bar.style.width)
    bar.style.width = '0%'
    observer.observe(bar)
  })
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.bg-stars {
  background-image: 
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent),
    radial-gradient(1px 1px at 33% 80%, white, transparent),
    radial-gradient(1px 1px at 15% 95%, white, transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: twinkle 20s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.skill-bar {
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>