/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@types": resolve(__dirname, "src/types"),
    },
  },
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
