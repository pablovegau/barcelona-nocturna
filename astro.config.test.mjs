import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Simple configuration for testing - static output only
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'static',
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