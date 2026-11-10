# Astro on Netlify Platform Starter

[Live Demo](https://astro-platform-starter.netlify.app/)

A modern starter based on Astro.js, Tailwind, and [Netlify Core Primitives](https://docs.netlify.com/core/overview/#develop) (Edge Functions, Image CDN, Blobs, Server).

## Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deploying to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/astro-platform-starter)

## Developing Locally

| Prerequisites                                                                |
| :--------------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/) v24+ (required by Netlify Server).            |
| (optional) [nvm](https://github.com/nvm-sh/nvm) for Node version management. |

1. Clone this repository, then run `npm install` in its root directory.

2. Recommended: link your local repository to a Netlify project. This will ensure you're using the same runtime version for both local development and your deployed project.

```
netlify link
```

3. Run the Astro.js development server:

```
npm run dev
```

### The Netlify Server demo

The `/server` page talks to a [Netlify Server](netlify/server/index.mjs): a long-running Node.js process that handles `/server/*` while Astro serves everything else. Two things make that work:

- Astro's adapter deploys a function that answers every path, so a small integration in `astro.config.mjs` excludes `/server/*` from it. If you change the server's `path`, change it there too.
- Netlify Server needs Node.js 24 or later, which `.nvmrc` selects for builds.

`npm run dev` doesn't run the server, so the page says there's no server to reach. `netlify dev` does run it, but currently hands it every request that isn't a static file instead of only `/server/*`, so the other server-rendered pages return a 404 there. Deploy the site (a Deploy Preview is enough) to see everything working together.
