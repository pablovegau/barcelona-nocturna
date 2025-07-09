import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Configuration specifically for testing - generates static files
export default defineConfig({
  integrations: [react(), mdx()],
  // No adapter = static output
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