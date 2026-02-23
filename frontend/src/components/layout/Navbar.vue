<template>
  <header class="sticky top-0 z-40 border-b border-gray-600/40 bg-black/95 backdrop-blur">
    <Container>
      <div class="flex h-16 items-center justify-between">
        <RouterLink
          to="/"
          class="font-display text-lg tracking-tight text-white transition-colors duration-200 hover:text-red-500"
        >
          Jaydin Morrison
        </RouterLink>

        <nav class="hidden items-center gap-6 md:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="group relative pb-1 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            :class="isActive(item.to) ? 'text-white' : ''"
          >
            {{ item.label }}
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-200"
              :class="isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'"
            />
          </RouterLink>
        </nav>

        <Disclosure v-slot="{ open }" as="div" class="md:hidden">
          <DisclosureButton
            class="inline-flex items-center rounded-lg border border-gray-600/60 p-2 text-gray-400 transition-colors duration-200 hover:border-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Menu v-if="!open" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </DisclosureButton>
          <DisclosurePanel class="absolute left-0 right-0 top-16 border-b border-gray-600/40 bg-black">
            <Container>
              <nav class="flex flex-col py-4">
                <RouterLink
                  v-for="item in navItems"
                  :key="item.to"
                  :to="item.to"
                  class="py-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  :class="isActive(item.to) ? 'text-red-500' : ''"
                >
                  {{ item.label }}
                </RouterLink>
              </nav>
            </Container>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </Container>
  </header>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Menu, X } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import Container from '@/components/layout/Container.vue'

const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const isActive = (path) => route.path === path
</script>
