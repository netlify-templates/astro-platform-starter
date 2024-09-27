import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), tailwind(), icon(), mdx()],
  output: 'hybrid',
  adapter: netlify(),
});
