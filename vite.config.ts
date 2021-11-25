import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: "3d-thing-background.js",
        manualChunks: undefined,
      },
    },
  },
  base: "/things-screen/",
});
