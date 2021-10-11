import { defineConfig } from "vite";

import alias from "@rollup/plugin-alias";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        {
          find: "@services",
          replacement: resolve("./src/services"),
        },
        {
          find: "@features",
          replacement: resolve("./src/features"),
        },
        {
          find: "@components",
          replacement: resolve("./src/components"),
        },
        {
          find: "@app",
          replacement: resolve("./src/app"),
        },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ["eventemitter3"], // <- modules that needs shimming have to be excluded from dep optimization
  },
});
