import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/roco-egg-helper/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
