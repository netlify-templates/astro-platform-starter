import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Custom plugin to slow down build
const slowBuildPlugin = () => ({
    name: 'slow-build',
    buildStart() {
        // Add 60 second delay at build start
        return new Promise(resolve => setTimeout(resolve, 60000));
    }
});

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss(), slowBuildPlugin()]
    },
    integrations: [react()],
    adapter: netlify()
});
