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
      // The suite covers every statement and branch of `src/`, so the gate sits
      // at 90% instead of 100%: a new defensive branch should not turn CI red
      // while it is still being written, but a real regression still fails.
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
})
