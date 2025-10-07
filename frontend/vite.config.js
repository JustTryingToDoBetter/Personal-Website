import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests during development to the Node middleware
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})