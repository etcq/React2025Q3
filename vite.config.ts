import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
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
