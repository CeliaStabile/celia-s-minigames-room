/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      exclude: [
        "dist/**",
        "**/tailwind.config.js",
        "**/postcss.config.js",
        "**/eslint.config.js",
        "**/vite.config.ts",
        "**/vite-env.d.ts",
        "**/src/main.tsx",
        "**/src/router/**",
        "**/src/types/**",
        "**/src/pages/**",
      ],
    },
  },
});
