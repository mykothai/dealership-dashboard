import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@api',
        replacement: path.resolve(__dirname, './src/api'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants.ts'),
      },

      {
        find: '@helpers',
        replacement: path.resolve(__dirname, './src/helpers.ts'),
      },
    ],
  },
})
