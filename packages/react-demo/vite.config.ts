import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Vite configuration. For more details on Capsule specific polyfills, see: https://docs.usecapsule.com/troubleshooting/vite-and-vue.js
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ["fs"],
      globals: {
        process: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "CapsuleDemo",
      fileName: (format) => `capsule-demo.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
