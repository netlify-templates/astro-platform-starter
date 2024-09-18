// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

import { button } from './.stackbit/models/button';
import { featuredItems } from './.stackbit/models/featuredItems';
import { hero } from './.stackbit/models/hero';
import { page } from './.stackbit/models/page';
import { post } from './.stackbit/models/post';
import { quote } from './.stackbit/models/quote';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'custom',
    nodeVersion: '18',
    devCommand: "node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1",
    experimental: {
        ssg: {
          name: "Astro",
          logPatterns: {
            up: ["is ready", "astro"],
          },
          directRoutes: {
            "socket.io": "socket.io",
          },
          passthrough: ["/vite-hmr/**"],
        },
      },
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['src/content'],
            models: [button, featuredItems, hero, page, post, quote],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'src/content',
                uploadDir: '_images',
                publicPath: '/src/content/'
            }
        })
    ]
});
