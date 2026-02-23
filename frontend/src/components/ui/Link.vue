<template>
  <component :is="tag" v-bind="componentProps" :class="linkClass">
    <slot />
  </component>
</template>

<script setup>
import clsx from 'clsx'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
})

const tag = computed(() => (props.to ? RouterLink : 'a'))

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  return { href: props.href, target: '_blank', rel: 'noreferrer' }
})

const linkClass = computed(() =>
  clsx(
    'text-sm text-white underline decoration-gray-600 underline-offset-4 transition-colors duration-200 hover:text-red-500 hover:decoration-red-500',
    props.className,
  ),
)
</script>
