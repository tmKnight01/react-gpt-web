import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path/posix";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "src/assets/styles/var.scss";',
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
