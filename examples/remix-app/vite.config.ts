import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: {
    include: ["@usecapsule/react-components", "@usecapsule/react-sdk"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        "node_modules/@usecapsule/react-sdk",
        "node_modules/@usecapsule/react-components",
      ],
    },
  },

  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3003,
    open: false,
  },
});
