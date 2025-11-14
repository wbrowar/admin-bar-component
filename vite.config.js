import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'

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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    browser: {
      enabled: true,
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.2,
            allowedMismatchedPixelRatio: 0.2,
          },
        },
      },
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      viewport: { width: 500, height: 100 },
    },
    name: 'browser',
    setupFiles: ['./vitest/setup-file.ts'],
  },
})
