import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

/**
 * Specific configuration for Visual Regression Tests (VRT)
 * 
 * Why do we need this separate config file?
 * - Main astro.config.mjs uses adapter: netlify() for production
 * - VRT needs a configuration that works with both static and SSR pages
 * - Some pages (like /characters) use server-side filtering and need SSR
 * 
 * When is this used?
 * - During Visual Regression Tests execution in CI (GitHub Actions)
 * - With command: astro build --config astro.config.test.mjs
 * - Followed by: node ./dist/server/entry.mjs (starts Node.js server)
 * 
 * What makes it different?
 * - output: 'server' → Enables SSR for pages that need it (like /characters)
 * - adapter: node() → Allows SSR pages to work in test environment
 * - Same integrations and CSS config as production
 * 
 * Note: This could be simplified by migrating server-side filters to client-side
 * (see LIST_OF_IMPROVEMENTS.md section 8)
 */
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