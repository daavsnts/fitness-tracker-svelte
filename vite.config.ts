import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $components: path.resolve("./src/components"),
      $assets: path.resolve("./src/assets"),
      $pages: path.resolve("./src/pages"),
      $helpers: path.resolve("./src/helpers"),
    }
  }
})
