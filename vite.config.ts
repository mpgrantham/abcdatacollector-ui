/// <reference types="vitest" />
import { defineConfig } from 'vite'
// import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../src/main/resources/static',
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8345",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
})
