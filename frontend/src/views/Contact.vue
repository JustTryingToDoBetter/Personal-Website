<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-900 py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" style="animation: pulse 3s ease-in-out infinite; animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Let's Connect
        </h1>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Have a project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you!
        </p>
        
        <!-- Quick Contact Methods -->
        <div class="flex flex-wrap justify-center gap-6 mb-8">
          <a href="mailto:jaydenmorrison2017@gmail.com" 
             class="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all hover:scale-105">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>jaydenmorrison2017@gmail.com</span>
          </a>
          
          <a href="https://github.com/JustTryingToDoBetter" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all hover:scale-105">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/jaydin-morrison-3a382a221" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all hover:scale-105">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 class="text-3xl font-bold mb-6 dark:text-white">
              <span class="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Send Me a Message
              </span>
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Fill out the form below and I'll get back to you as soon as possible. Usually within 24 hours!
            </p>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Your Name *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none"
                  />
                </div>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Your Email *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    required
                    placeholder="john@example.com"
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none"
                  />
                </div>
              </div>

              <!-- Subject Field -->
              <div>
                <label for="subject" class="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.subject"
                    type="text"
                    id="subject"
                    placeholder="Project collaboration, job opportunity, etc."
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none"
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div>
                <label for="message" class="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                  Your Message *
                </label>
                <textarea
                  v-model="form.message"
                  id="message"
                  required
                  rows="6"
                  placeholder="Tell me about your project, idea, or just say hi..."
                  class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <svg v-if="!isSubmitting" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <svg v-else class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              </button>

              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="p-4 bg-green-50 dark:bg-green-900/30 border-2 border-green-500 rounded-xl flex items-start gap-3 animate-fade-in"
              >
                <svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-green-700 dark:text-green-300">Success!</h4>
                  <p class="text-green-600 dark:text-green-400">{{ successMessage }}</p>
                </div>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-500 rounded-xl flex items-start gap-3 animate-fade-in"
              >
                <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-red-700 dark:text-red-300">Error</h4>
                  <p class="text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                </div>
              </div>
            </form>
          </div>

          <!-- Contact Information & FAQ -->
          <div class="space-y-8">
            <!-- Why Contact Me -->
            <div class="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border-2 border-cyan-100 dark:border-cyan-900">
              <h3 class="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
                <span class="text-3xl">💬</span>
                Why Reach Out?
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 class="font-semibold dark:text-white">Hire Me for a Project</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Full-stack development, AI/ML, or creative web experiences</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 class="font-semibold dark:text-white">Collaboration Opportunities</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Open source, research, or innovative ideas</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 class="font-semibold dark:text-white">Job Opportunities</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Full-time, internship, or contract positions</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 class="font-semibold dark:text-white">Just Say Hi!</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Always happy to connect with fellow developers</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Response Time -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
                <span class="text-3xl">⚡</span>
                Quick Info
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <div class="font-semibold dark:text-white">Response Time</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Usually within 24 hours</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <div class="font-semibold dark:text-white">Availability</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Open to new opportunities</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <div class="font-semibold dark:text-white">Location</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">South Africa (Remote-friendly)</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links Card -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border-2 border-purple-100 dark:border-purple-900">
              <h3 class="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
                <span class="text-3xl">🔗</span>
                Connect Elsewhere
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <a href="https://github.com/JustTryingToDoBetter" target="_blank" rel="noopener noreferrer"
                   class="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <svg class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span class="text-sm font-semibold dark:text-white">GitHub</span>
                </a>
                
                <a href="www.linkedin.com/in/jaydin-morrison-3a382a221" target="_blank" rel="noopener noreferrer"
                   class="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span class="text-sm font-semibold dark:text-white">LinkedIn</span>
                </a>
                
                <a href="https://twitter.com/jaydin_m" target="_blank" rel="noopener noreferrer"
                   class="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                  <span class="text-sm font-semibold dark:text-white">Twitter</span>
                </a>
                
                <a href="mailto:jaydenmorrison2017@gmail.com"
                   class="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-sm font-semibold dark:text-white">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitForm() {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  
  try {
    await axios.post('/api/contact', form.value)
    successMessage.value = 'Thank you for your message! I\'ll get back to you within 24 hours.'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    console.error('Error sending message:', error)
    errorMessage.value = 'Oops! Something went wrong. Please try again or email me directly at jaydin@example.com'
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>