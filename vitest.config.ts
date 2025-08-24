import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    root: resolve(__dirname),
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setup-tests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('src', import.meta.url)),
      },
      {
        find: '@interfaces',
        replacement: fileURLToPath(
          new URL('./src/core/interfaces', import.meta.url)
        ),
      },
      {
        find: '@style',
        replacement: fileURLToPath(
          new URL('./src/assets/style', import.meta.url)
        ),
      },
      {
        find: '@stores',
        replacement: fileURLToPath(
          new URL('./src/core/stores', import.meta.url)
        ),
      },
      {
        find: '@components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(
          new URL('./src/core/hooks', import.meta.url)
        ),
      },
      {
        find: '@services',
        replacement: fileURLToPath(
          new URL('./src/core/services', import.meta.url)
        ),
      },
      {
        find: '@constants',
        replacement: fileURLToPath(
          new URL('./src/core/constants', import.meta.url)
        ),
      },
    ],
  },
});
