import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

export default defineConfig({
  integrations: [react(), tailwind(), icon()],
  output: 'hybrid',
  adapter: netlify(),
});