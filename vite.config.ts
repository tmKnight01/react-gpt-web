import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { resolve } from "path";

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv;

  return {
    envDir: "./env",
    plugins: [react(), visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "analyze.html", //分析图生成的文件名
      open: true //如果存在本地服务端口，将在打包后自动展示
    }), viteCompression()],

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react': ["react", "react-dom"],
            "antd-library": ["antd", "@ant-design/icons"],
            'lodash': ['lodash'],
            'highlight': ["highlight.js"]

          },

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
