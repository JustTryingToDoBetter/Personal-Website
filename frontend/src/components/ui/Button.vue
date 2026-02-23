<template>
  <component :is="tag" v-bind="componentProps" :class="buttonClass">
    <slot />
  </component>
</template>

<script setup>
import clsx from 'clsx'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
})

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noreferrer' }
  return { type: props.type }
})

const buttonClass = computed(() =>
  clsx(
    'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500',
    {
      'border-red-500 bg-red-500 text-white hover:border-red-600 hover:bg-red-600': props.variant === 'primary',
      'border-white/70 bg-transparent text-white hover:border-red-500 hover:text-red-500': props.variant === 'secondary',
      'border-transparent bg-transparent text-gray-400 hover:text-red-500': props.variant === 'ghost',
    },
  ),
)
</script>
