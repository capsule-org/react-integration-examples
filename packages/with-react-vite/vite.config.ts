import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  base: "/react-integration-examples/",
  plugins: [nodePolyfills(), react()],
  server: {
    port: 3002,
    open: false,
  },
});
