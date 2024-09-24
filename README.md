# Astro on Netlify Platform Starter

[Live Demo](https://astro-platform-starter.netlify.app/)

A modern starter based on Astro.js, Tailwind, daisyUI, and [Netlify Core Primitives](https://docs.netlify.com/core/overview/#develop) (Edge Functions, Image CDN, Blob Store).

## Overview
This project integrates Astro.js for static site generation with Tailwind CSS for utility-first styling and daisyUI components to enhance user interface design. It is optimized for deployment on Netlify, utilizing its Edge Functions, Image CDN, and Blob Store capabilities.

## Use Cases:
Building a modern, responsive, and performant website.
Quickly deploying static sites or Jamstack apps with advanced Netlify features.
Tailoring web applications using Astro's powerful component system.

## Project Structure:

astro-platform-starter/
├── public/           # Static files (images, etc.)
├── src/
│   ├── components/   # Reusable UI components
│   ├── layouts/      # Layout templates for pages
│   └── pages/        # Pages in the project
├── netlify/          # Netlify-specific configurations
└── package.json      # Project dependencies and scripts

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

| Prerequisites             |
| :------------------------ |
| [Node.js](https://nodejs.org/) v18.14+. |
| (optional) [nvm](https://github.com/nvm-sh/nvm) for Node version management. |

1. Clone this repository, then run `npm install` in its root directory.

```
git clone https://github.com/YOUR_USERNAME/astro-platform-starter.git
```

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

## Customization
Tailwind CSS & daisyUI
You can modify the `tailwind.config.js` file to customize the default theme or add custom components.

Netlify Functions
For Edge Functions and other Netlify-specific features, refer to the `netlify` directory. You can update the configurations to suit your deployment needs.

Netlify functions
## Common Issues and Troubleshooting
Local server not starting: Ensure Node.js is installed, and you are using the correct version (v18.14+). You can manage versions with nvm if needed.
Netlify CLI errors: Try re-installing the Netlify CLI if you encounter issues or ensure that your account is properly linked to the project.

## FAQ
Q: How do I update the Astro.js version? 
A: You can update the version by modifying the package.json file and running npm install to refresh the dependencies.

Q: Can I use another hosting service besides Netlify? 
A: Yes, but you'll need to adapt the deployment process accordingly, as this project is optimized for Netlify's platform and features.