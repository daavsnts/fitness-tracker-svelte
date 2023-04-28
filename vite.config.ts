import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import aliases from "./aliases.config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],

  resolve: {
    alias: aliases,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use \"$styles/variables.scss\" as *;",
      },
    },
  },
});
