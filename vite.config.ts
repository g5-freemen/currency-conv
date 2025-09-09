import react from '@vitejs/plugin-react-swc';

import svgr from 'vite-plugin-svgr';

import { defineConfig } from 'vite';

import path from 'node:path';

import { dependencies } from './package.json';

const presetChunks = {
  'react-ecosystem-vendor': ['react', 'react-router-dom', 'react-dom'],
  'utility-vendor': ['lodash', 'clsx', 'react-toastify', 'axios'],
};

function renderChunks() {
  let chunks = {};
  Object.keys(dependencies).forEach((key) => {
    if (Object.values(presetChunks).flat().includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [react(), svgr()],
  preview: {
    port: 3000,
    host: true,
    open: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: './build',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...presetChunks,
          ...renderChunks(),
        },
      },
    },
  },
});
