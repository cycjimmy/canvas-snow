import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['__test__/**/*.test.ts'],
    // jsdom has no canvas implementation, so the 2D context is replaced before
    // any module under test is loaded.
    setupFiles: ['__test__/setup.ts'],
    coverage: {
      provider: 'v8',
      // `lcov` writes coverage/lcov.info, the default path the Coveralls action
      // reads.
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/types/**'],
      thresholds: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
    },
  },
})
