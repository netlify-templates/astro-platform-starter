# Bengals CC - Project Documentation

## Project Overview

**Technology Stack:**
- **Framework**: Astro.js v5.16.10 (Static Site Generator with SSR capabilities)
- **Styling**: Tailwind CSS v4 (utility-first CSS framework)
- **UI Components**: React v19 integration for interactive components
- **Deployment**: Netlify adapter with platform-specific features
- **Font**: Inter Variable (modern sans-serif)

## Project Structure

```
bengalscc/
├── src/
│   ├── pages/           # Route-based pages (Astro's file-based routing)
│   │   ├── index.astro  # Homepage
│   │   ├── revalidation.astro
│   │   ├── image-cdn.astro
│   │   ├── edge/        # Edge function demos
│   │   ├── blobs/       # Blob storage demos
│   │   └── api/         # API endpoints
│   ├── layouts/
│   │   └── Layout.astro # Main layout wrapper
│   ├── components/      # Reusable components
│   ├── styles/
│   │   └── globals.css  # Global styles & Tailwind config
│   ├── utils.ts         # Helper functions
│   └── types.ts         # TypeScript type definitions
├── public/              # Static assets (images, favicon)
├── netlify/            # Netlify-specific features
│   └── edge-functions/ # Edge function handlers
└── astro.config.mjs    # Astro configuration
```

## Key Features Currently Implemented

1. **Netlify Platform Features** (demo pages):
   - Cache revalidation with tags
   - Image CDN optimization
   - Edge functions with geo-location
   - Blob storage for data

2. **Design System**:
   - Color scheme: Primary (#f67280 pink), Complementary (#355c7d blue)
   - Custom button components (`.btn`, `.btn-lg`)
   - Responsive layout (max-width: 1280px)
   - Noise texture background

3. **Routing**:
   - File-based routing (each `.astro` file in `pages/` becomes a route)
   - Both static and server-rendered pages (`prerender: false`)
   - API endpoints in `/api/` directory

## How It Works

1. **Development**: `npm run dev` starts local server at localhost:4321
2. **Build**: `npm run build` creates production build in `./dist/`
3. **Pages**: Create `.astro` files in `src/pages/` for new routes
4. **Components**: Mix Astro components (`.astro`) and React components (`.tsx`)
5. **Styling**: Use Tailwind utility classes or custom CSS in globals.css
6. **Deployment**: Optimized for Netlify with SSR, Edge Functions, and CDN features

## Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Current Layout Structure

- **Header**: Navigation menu with links (currently: Home, Revalidation, Image CDN, Edge Function, Blobs)
- **Footer**: Simple footer with link to Astro on Netlify docs
- **Layout**: Responsive container with Header, Main content area (slot), and Footer

## Utility Functions Available

- `randomInt(min, max)`: Generate random integers
- `uniqueName()`: Generate unique names with adjectives-animals-number format
- `generateBlob(parameters)`: Generate SVG blob shapes with gradients
- `cacheHeaders(maxAgeDays, cacheTags)`: Create cache control headers for Netlify CDN
- `uploadDisabled`: Check if uploads are disabled via environment variable

## Notes

- The project is set up as a showcase/starter for Netlify platform features
- Provides a solid foundation for building a custom cricket team website
- Uses file-based routing - add new pages by creating `.astro` files in `src/pages/`
- Support for both static generation and server-side rendering
