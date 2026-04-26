import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Gradle의 copyReactBuildFiles 태스크가 build/ 를 참조하므로 유지
    outDir: 'build',
  },
  server: {
    // CRA의 package.json "proxy" 설정을 이관
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
