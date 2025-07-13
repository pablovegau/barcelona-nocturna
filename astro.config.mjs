import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import react from '@astrojs/react';

export default defineConfig({
  integrations: [react(), mdx()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        browserslist: '>= 0.25%',
        minify: true,
      }
    }
  }
});
