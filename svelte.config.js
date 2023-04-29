import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import scssAliases from "./scssAliases.js";
import aliases from "./aliases.config.js";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      scss: {
        prependData: '@use "$styles/variables.scss" as *;',
        importer: [
          // Bad typecast, but this feature doesn't seem deprecated, only the type
          scssAliases(aliases),
        ],
      },
    }),
  ],
};
