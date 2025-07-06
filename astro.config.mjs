import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  integrations: [react(), mdx()],
  adapter: netlify(),
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
