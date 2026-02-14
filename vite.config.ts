import path from 'path';
// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ReactCompilerConfig = {
  target: '19'
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log('🚀 Current Vite Mode:', mode);
  
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ]
        }
      }),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.ts'
    },
    server: {
      proxy: {
        '/api': {
          target: mode === 'development' ? 'http://localhost:3002' : 'https://ortaskbe.afordonez.com',
          changeOrigin: true,
        },
      },
    },
  };
})
