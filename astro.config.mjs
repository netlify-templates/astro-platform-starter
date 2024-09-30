import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    icon(),
    expressiveCode({
      themes: 'poimandres',
      styleOverrides: {
        borderColor: 'transparent',
        borderRadius: '5px',
        codeFontSize: '0.9rem',
        codePaddingBlock: '2em',
        codePaddingInline: '2em',
        textMarkers: {
          backgroundOpacity: '30%',
          insHue: '175',
          delHue: '15',
        },
        frames: {
          tooltipSuccessBackground: '#5de4c7',
          tooltipSuccessForeground: '#12181f',
        },
      },
    }),
    mdx(),
  ],
  output: 'hybrid',
  adapter: netlify(),
});
