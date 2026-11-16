import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      cssFileName: 'admin-bar',
      entry: {
        'admin-bar': resolve(__dirname, 'lib/main.ts'),
      },
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    minify: 'terser',
    rolldownOptions: {
      external: ['lib'],
    },
  },
  plugins: [minifyHTML()],
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
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      viewport: { width: 500, height: 100 },
    },
    env: {
      ENABLE_SCREENSHOTS: !loadEnv(mode, process.cwd(), '').VITE_DISABLE_SCREENSHOTS,
    },
    setupFiles: ['./vitest/setup-file.ts'],
  },
}))
