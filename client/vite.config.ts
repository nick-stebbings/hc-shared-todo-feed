import { defineConfig } from "vite";

import globals from "rollup-plugin-node-globals";
// import polyfillNode from "rollup-plugin-polyfill-node";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), globals()],
  optimizeDeps: {
    exclude: ["eventemitter3"], // <- modules that needs shimming have to be excluded from dep optimization
  },
});
