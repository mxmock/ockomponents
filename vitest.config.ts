import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    clearMocks: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
    resolveSnapshotPath: (path, ext) => {
      const index = path.lastIndexOf("/");
      const name = path.slice(index);
      return `./src/__tests__/__snapshots__/${name}${ext}`;
    },
  },
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
      "#assets": path.resolve(__dirname, "./src/assets"),
      "#components": path.resolve(__dirname, "./src/components"),
      "#utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
