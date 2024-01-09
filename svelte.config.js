import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $src: path.resolve('./src'),
      $components: path.resolve('./src/components'),
      $lib: path.resolve('./src/lib'),
      $routes: path.resolve('/src/routes'),
    },
  },
  preprocess: vitePreprocess(),
};
export default config;
