import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), ElementPlus()],
  server: {
    host: 'localhost',
    port: 7890,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
