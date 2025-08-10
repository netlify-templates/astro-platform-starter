# DinnaFind Product Landing Page

This is a modern, responsive product landing page for DinnaFind - a restaurant discovery app built with Astro and deployed on Netlify.

## 🚀 Features

- **Modern Design**: Gradient backgrounds, animations, and glass morphism effects
- **Fully Responsive**: Works perfectly on all devices
- **Performance Optimized**: Built with Astro for blazing-fast load times
- **Component-Based**: Modular architecture with reusable Astro components
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Netlify Ready**: Configured for easy deployment to Netlify

## 📄 Pages

- `/` - Main platform starter page with link to DinnaFind demo
- `/dinnafind` - Complete DinnaFind product landing page

## 🧱 Components

- `DinnaFindAlert.astro` - Alert banner for promotional messages
- `FeatureCard.astro` - Reusable feature card component with hover effects

## 🎨 Key Sections

1. **Hero Section** - Eye-catching introduction with animated phone mockup
2. **Features Grid** - 6 key features with icons and descriptions
3. **How It Works** - 4-step process visualization
4. **Testimonials** - User reviews and social proof
5. **Stats Section** - Key metrics and achievements
6. **Download CTA** - App store download buttons
7. **Newsletter Signup** - Email collection form

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to Netlify

### Option 1: Deploy via Git

1. Push this repository to GitHub
2. Connect the repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Option 2: Manual Deploy

```bash
# Build the project
npm run build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod --dir=dist
```

## 🎨 Customization

### Colors
The color scheme uses purple and pink gradients. To customize, edit the gradient definitions in the `<style>` section of `/src/pages/dinnafind.astro`:

```css
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Content
All content (features, testimonials, stats) is defined as data arrays at the top of the component for easy editing.

## 📱 Live Demo

- Production site: [https://dinnafind.com](https://dinnafind.com)
- This demo: Deploy to see it live!

## 🤝 Integration with DinnaFind App

This landing page is designed to promote the DinnaFind mobile app. Update the download links in the CTA section to point to your actual app store listings.

## 📄 License

This project is part of the Netlify Astro Platform Starter template.