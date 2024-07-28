import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $assets: './src/assets',
      $routes: './src/routes',
      $components: './src/components',
      $lib: './src/lib',
    },
  },
  preprocess: vitePreprocess(),
};
export default config;
