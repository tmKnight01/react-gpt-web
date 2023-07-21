import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv;

  return {
    envDir: "./env",
    plugins: [react()],
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          antd: ["antd"],

        },

      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },

    server: {
      host: "0.0.0.0",
      open: true,
      port: 5173,
      proxy: {
        "/api": {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path?.replace("/api/", "/"),
        },
        proxy_buffering: "off",
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      // alias: [{ find: "@", replacement: "./src" }]
    },

    // build: {
    //   rollupOptions: {
    //     external: {

    //     }
    //   }
    // }
  }
});
