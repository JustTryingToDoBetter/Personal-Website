<template>
  <Section class-name="pt-14 md:pt-20">
    <h1 class="font-display text-4xl text-white sm:text-5xl">Contact</h1>
    <p class="mt-3 max-w-2xl text-gray-400">
      For collaborations, consulting, or full-time opportunities, send a short brief below.
    </p>

    <div class="mt-8 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
      <Card>
        <form class="space-y-4" @submit.prevent>
          <div>
            <label
              for="name"
              class="mb-2 block font-mono text-xs uppercase tracking-wide text-gray-400"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              class="w-full rounded-lg border border-gray-600/60 bg-black px-3 py-2 text-sm text-white outline-none transition-colors duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              for="email"
              class="mb-2 block font-mono text-xs uppercase tracking-wide text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              class="w-full rounded-lg border border-gray-600/60 bg-black px-3 py-2 text-sm text-white outline-none transition-colors duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              for="message"
              class="mb-2 block font-mono text-xs uppercase tracking-wide text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              class="w-full rounded-lg border border-gray-600/60 bg-black px-3 py-2 text-sm text-white outline-none transition-colors duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              placeholder="Tell me about your project."
            />
          </div>
          <Button type="submit">Send Inquiry</Button>
        </form>
      </Card>

      <Card>
        <h2 class="font-display text-2xl text-white">Direct</h2>
        <p class="mt-3 text-sm text-gray-400">Email: jaydin@example.com</p>
        <p class="mt-2 text-sm text-gray-400">GitHub: @JustTryingToDoBetter</p>
        <p class="mt-2 text-sm text-gray-400">Location: United States</p>
      </Card>
    </div>
  </Section>
</template>

<script setup>
import Section from '@/components/layout/Section.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
</script>
