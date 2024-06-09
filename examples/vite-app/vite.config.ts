import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  optimizeDeps: {
    include: ["@usecapsule/react-sdk", "@usecapsule/react-components"],
  },
  plugins: [nodePolyfills(), react()],
  server: {
    port: 3004,
    open: false,
  },
});
