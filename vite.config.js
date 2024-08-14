import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


export default defineConfig({
  base: '/little-fighter-pixijs/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
