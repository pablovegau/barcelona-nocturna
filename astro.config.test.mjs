import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/**
 * Specific configuration for Visual Regression Tests (VRT)
 * 
 * Why do we need this separate config file?
 * - Main astro.config.mjs uses adapter: netlify() for production
 * - Netlify adapter generates files optimized for Netlify Functions
 * - These files are NOT compatible with simple HTTP servers like 'serve'
 * - VRT needs a basic server that serves static files
 * 
 * When is this used?
 * - During Visual Regression Tests execution in CI (GitHub Actions)
 * - With command: astro build --config astro.config.test.mjs
 * - Followed by: serve dist -l 4173 (simple HTTP server)
 * 
 * What makes it different?
 * - output: 'static' → Generates standard HTML/CSS/JS static files
 * - NO adapter → Compatible with any HTTP server
 * - Same integrations and CSS config as production
 * 
 * Note: This could be simplified by migrating server-side filters to client-side
 * (see LIST_OF_IMPROVEMENTS.md section 8)
 */
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