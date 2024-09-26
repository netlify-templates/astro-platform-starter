import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [
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
