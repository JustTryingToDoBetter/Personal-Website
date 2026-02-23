<template>
  <article :class="cardClass">
    <slot />
  </article>
</template>

<script setup>
import clsx from 'clsx'
import { computed } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
})

const cardClass = computed(() =>
  clsx(
    'rounded-lg border border-gray-600/50 bg-surface p-5 transition-all duration-200 hover:-translate-y-px hover:border-white/40',
    props.className,
  ),
)
</script>
