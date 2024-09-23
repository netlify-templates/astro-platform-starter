# Astro on Netlify Platform Starter

[Live Demo](https://astro-platform-starter.netlify.app/)

A modern starter based on Astro.js, Tailwind, daisyUI, and [Netlify Core Primitives](https://docs.netlify.com/core/overview/#develop) (Edge Functions, Image CDN, Blob Store).

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
| [Node.js](https://nodejs.org/) v18.14+.                                      |
| (optional) [nvm](https://github.com/nvm-sh/nvm) for Node version management. |

1. Clone this repository, then run `npm install` in its root directory.

2. For the starter to have full functionality locally (e.g. edge functions, blob store), please ensure you have an up-to-date version of Netlify CLI. Run:

```
npm install netlify-cli@latest -g
```

3. Link your local repository to the deployed Netlify site. This will ensure you're using the same runtime version for both local development and your deployed site.

```
netlify link
```

4. Then, run the Astro.js development server via Netlify CLI:

```
netlify dev
```

If your browser doesn't navigate to the site automatically, visit [localhost:8888](http://localhost:8888).

### Sign Into Sanity

If you are not already signed into Sanity via the CLI, install the CLI package and then run the login command.

    npm install -g @sanity/cli
    sanity login

This will open a browser and walk you through the authentication process.

### Import Content

Once authenticated, you'll be able to create a Sanity project and import content.

    npm run create-project

_Note: You may want to sign into Sanity in the browser and rename your project._

Once the project exists and you've set the environment variables, you can import the content.

    npm run import {projectId}

Replace `{projectId}` with the project ID output from the previous command.

### Store Sanity Values

Sign into Sanity to create an editor token, navigate to the following address (replace the `SANITY_PROJECT_ID` with your project ID) `https://www.sanity.io/manage/personal/project/SANITY_PROJECT_ID/api#tokens`. Then create `.env` file in you repo, copy & paste the following environment variables into the file and set their values.

```plain
SANITY_PROJECT_ID="..."
SANITY_DATASET="..."
SANITY_TOKEN="..."
```

### Run Sanity Studio

Sanity Studio code exists for this project in the `studio` directory. First, install the dependencies in this directory.

    cd studio
    npm install

Then create a `.env` file in the `studio` directory with the following environment variables and set their values:

```plain
SANITY_STUDIO_PROJECT_ID="..."
SANITY_STUDIO_DATASET="..."
```

Then run the studio locally.

    sanity dev

If you want to see the content, you can open your browser and navigate to localhost:3333.

### Start Development Server

Then you can run the Astro.js development server in root directory:

```txt
npm run dev
```

Install Netlify Create CLI:

    npm install -g @stackbit/cli

And the Stackbit development server.

    stackbit dev

This outputs your own Netlify Create URL. Open this, register or sign in, and you will be directed to Netlify Create's visual editor for your new project.
