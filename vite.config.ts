import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0" // 可通过本机IP访问
  },
  plugins: [vue()]
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: '@import "./src/assets/scss/var.scss";'
  //     }
  //   }
  // }
});
