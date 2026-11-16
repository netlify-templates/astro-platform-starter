import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// The adapter deploys Astro as a function that answers every path, so the Netlify Server in
// `netlify/server/` would never get a request. This excludes the server's paths from that
// function once the adapter has written it. Keep the paths in sync with `config.path` there.
function netlifyServerPaths(paths) {
    let root;
    return {
        name: 'netlify-server-paths',
        hooks: {
            'astro:config:done': ({ config }) => {
                root = config.root;
            },
            'astro:build:done': async () => {
                const file = new URL('./.netlify/v1/functions/ssr/ssr.mjs', root);
                const source = await readFile(file, 'utf8');
                const patched = source.replace("path: '/*',", `path: '/*', excludedPath: ${JSON.stringify(paths)},`);
                if (patched === source) {
                    throw new Error(`Could not exclude ${paths.join(', ')} from the Astro function, so the Netlify Server would be unreachable.`);
                }
                await writeFile(file, patched);
            }
        }
    };
}

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [react(), netlifyServerPaths(['/server/*'])],
    adapter: netlify({
        devFeatures: {
            environmentVariables: true
        }
    })
});
