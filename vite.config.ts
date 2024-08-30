import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './gazprom/',
  plugins: [react(), svgr({ svgrOptions: {} })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";
        @import "src/styles/mixins.scss"; `,
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
