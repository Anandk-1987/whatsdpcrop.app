import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/whatsdpcrop.app/',  // Replace with your repo name
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
