import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      fileName: 'admin-bar',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lib'],
    },
  },
})
