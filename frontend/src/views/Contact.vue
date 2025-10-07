<template>
  <div class="container mx-auto px-4 py-16 max-w-xl">
    <h1 class="text-3xl font-bold mb-6">Contact</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block mb-2 font-semibold">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          required
          class="w-full p-3 border rounded"
        />
      </div>
      <div>
        <label for="email" class="block mb-2 font-semibold">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="w-full p-3 border rounded"
        />
      </div>
      <div>
        <label for="message" class="block mb-2 font-semibold">Message</label>
        <textarea
          v-model="form.message"
          id="message"
          required
          class="w-full p-3 border rounded h-40"
        ></textarea>
      </div>
      <button
        type="submit"
        class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Message
      </button>
      <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      successMessage: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('/api/contact', this.form)
        this.successMessage = 'Thank you for your message!'
        this.form.name = ''
        this.form.email = ''
        this.form.message = ''
      } catch (error) {
        console.error('Error sending message', error)
      }
    },
  },
}
</script>