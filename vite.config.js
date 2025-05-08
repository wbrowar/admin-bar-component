import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    lib: {
      entry: {
        'admin-bar': resolve(__dirname, 'lib/main.ts'),
      },
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lib'],
    },
  },
})
