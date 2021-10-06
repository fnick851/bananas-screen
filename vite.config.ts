import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: "bananas-background.js",
        manualChunks: undefined,
      },
    },
  },
  base: "/bananas-screen/",
});
