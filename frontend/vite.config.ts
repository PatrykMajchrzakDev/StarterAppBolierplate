import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sassGlobImport from "vite-plugin-sass-glob-import";

export default defineConfig({
  plugins: [react(), sassGlobImport()],
  css: {
    preprocessorOptions: {
      scss: {
        // Globals are imported in main.tsx
        additionalData: `@import "./src/styles/_variables.scss"; @import "./src/styles/_mixins.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
