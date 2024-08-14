import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


export default defineConfig({
  // deploy github page setting
  base: process.env.NODE_ENV === 'development' ? '/' : `/${process.env.npm_package_name}/`,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
