import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        productListing: resolve(__dirname, 'src/product_listing/index.html')
      }
    }
  },
  server: {
    port: 3000
  }
});