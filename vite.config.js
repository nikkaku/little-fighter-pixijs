import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


export default defineConfig({
  base: process.env.NODE_ENV ? '/' : '/little-fighter-pixijs/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
