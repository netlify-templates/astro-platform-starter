import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { sanityConfig } from './src/utils/sanity-client';

// https://astro.build/config
export default defineConfig({
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity(sanityConfig),
        react(),
        tailwind({
            applyBaseStyles: false
        })
    ],
    vite: {
        server: {
            hmr: { path: '/vite-hmr/' }
        }
    },
    server: {
        port: 3000
    },
    output: 'hybrid',
    adapter: netlify()
});
