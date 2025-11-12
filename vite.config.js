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
    projects: [
      {
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
          },
        },
        test: {
          environment: 'jsdom',
          include: ['**/*.unit.test.?(c|m)[jt]s?(x)'],
          name: 'unit',
        },
      },
      {
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
          },
        },
        test: {
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
          },
          include: ['**/*.browser.test.?(c|m)[jt]s?(x)'],
          name: 'browser',
          setupFiles: ['./vitest/setup-file.ts'],
        },
      },
    ],
  },
})
