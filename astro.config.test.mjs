import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Configuration specifically for testing - generates static files
export default defineConfig({
  integrations: [react(), mdx()],
  // Force static output for all pages
  output: 'static',
  // Clean configuration for testing
  trailingSlash: 'ignore',
  compressHTML: true,
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