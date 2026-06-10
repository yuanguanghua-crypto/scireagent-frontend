/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
    css: true,
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err) => console.error('Proxy error:', err))
          proxy.on('proxyReq', (_proxyReq, req) => {
            if (req.method === 'POST') {
              let body = ''
              req.on('data', (chunk: string) => { body += chunk })
              req.on('end', () => { console.log('Proxy POST to:', req.url, 'body:', body) })
            }
          })
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Proxy response:', req.url, proxyRes.statusCode)
          })
        },
      },
    },
  },
})
