<template>
  <section class="p-10 text-gray-900 bg-white min-h-screen">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">
        {{ project?.title || `Project #${id}` }}
      </h1>

      <p class="text-gray-700 mb-8 leading-relaxed">
        {{ project?.description || 'Description coming soon...' }}
      </p>

      <router-link to="/" class="text-blue-600 hover:underline">
        ← Back to Home
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectDetail',
  props: { id: { type: [String, Number], required: true } },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'Neural Pulse',
          description:
            'Interactive real-time data streams rendered through a sleek cyberpunk UI.',
        },
        {
          id: 2,
          title: 'EchoGrid',
          description:
            'Asynchronous dashboard visualizer for futuristic system telemetry.',
        },
        {
          id: 3,
          title: 'OrbitVision',
          description:
            '3D multi-object tracking visualizer powered by YOLOv8 and DeepSORT.',
        },
      ],
    }
  },
  computed: {
    project() {
      const nid = Number(this.id)
      return this.projects.find((p) => Number(p.id) === nid)
    },
  },
}
</script>

<style scoped>
section {
  transition: all 0.3s ease;
}
</style>
