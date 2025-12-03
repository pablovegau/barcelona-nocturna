import mdx from '@astrojs/mdx';
import { defineConfig, envField } from 'astro/config';

import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  integrations: [react(), mdx()],
  adapter: netlify(),
  env: {
    schema: {
      GOOGLE_GENERATIVE_AI_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});
