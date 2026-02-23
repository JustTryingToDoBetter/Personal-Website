<template>
  <section :class="sectionClass">
    <Container>
      <slot />
    </Container>
  </section>
</template>

<script setup>
import clsx from 'clsx'
import { computed } from 'vue'
import Container from '@/components/layout/Container.vue'

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
})

const sectionClass = computed(() => clsx('py-12 md:py-16', props.className))
</script>
