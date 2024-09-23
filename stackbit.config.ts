import path from 'path';
import { defineStackbitConfig } from '@stackbit/types';
import { SanityContentSource } from '@stackbit/cms-sanity';
import { Actions } from '@stackbit/utils';
import { hero } from './.stackbit/models/hero';
import { page } from './.stackbit/models/page';
import { post } from './.stackbit/models/post';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    nodeVersion: '18',
    ssgName: 'custom',
    devCommand: 'node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1',
    actions: [
        Actions.GenerateContentFromPreset({
          label: 'Generate content with AI',
          modelsConfig: [
            {
              name: 'post',
            },
          ],
        }),
      ],
    experimental: {
        ssg: {
            name: 'Astro',
            logPatterns: {
                up: ['is ready', 'astro']
            },
            directRoutes: {
                'socket.io': 'socket.io'
            },
            passthrough: ['/vite-hmr/**']
        }
    },
    contentSources: [
        new SanityContentSource({
            rootPath: __dirname,
            studioPath: path.join(__dirname, 'studio'),
            studioUrl: '',
            projectId: process.env.SANITY_PROJECT_ID!,
            token: process.env.SANITY_TOKEN!,
            dataset: process.env.SANITY_DATASET || 'production'
        })
    ],
    modelExtensions: [hero, page, post]
});
