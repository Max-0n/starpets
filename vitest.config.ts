import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '@': resolve(__dirname, './src'),
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '**/*.config.*', '**/types/**', '**/*.d.ts', 'dist/', '.nuxt/'],
    },
  },
})
