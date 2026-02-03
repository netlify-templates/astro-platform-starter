# Theming Guide

This document explains how to customize the website's theme. All theme values are centralized in `src/styles/globals.css` for easy maintenance.

## Quick Theme Change

To change the entire website's color scheme, simply update the color variables in `src/styles/globals.css`:

```css
@theme {
    /* Brand Colors - Change these for a new color scheme */
    --color-primary: #f97316;           /* Main accent color (buttons, links) */
    --color-primary-content: #ffffff;   /* Text color on primary buttons */

    /* Background Colors - Change these to switch between light/dark themes */
    --color-bg-body: #ffffff;           /* Main page background */
    --color-bg-card: #f9fafb;           /* Card/section backgrounds */
    --color-bg-card-hover: #f3f4f6;     /* Card hover state */
    --color-bg-section-alt: #f9fafb;    /* Alternate section backgrounds */
    --color-bg-hero: #fff7ed;           /* Hero section start color */
    --color-bg-hero-dark: #ffedd5;      /* Hero section end color */
    --color-bg-input: #f9fafb;          /* Form input backgrounds */

    /* Text Colors */
    --color-text-body: #111827;         /* Main body text */
    --color-text-heading: #111827;      /* Headings */
    --color-text-muted: #4b5563;        /* Secondary text */
    --color-text-subtle: #6b7280;       /* Tertiary text */
    --color-text-placeholder: #9ca3af;  /* Form placeholders */

    /* Border Colors */
    --color-border: #e5e7eb;            /* Default borders */
    --color-border-strong: #d1d5db;     /* Emphasized borders */

    /* Secondary Button Colors */
    --color-btn-secondary: #e5e7eb;
    --color-btn-secondary-hover: #d1d5db;
    --color-btn-secondary-text: #111827;
}
```

## Using Theme Classes in Components

Instead of using hardcoded Tailwind classes, use these semantic CSS classes:

### Buttons
```html
<!-- Primary button -->
<a href="/link" class="btn">Click Me</a>

<!-- Secondary button -->
<a href="/link" class="btn btn-secondary">Click Me</a>

<!-- Large button -->
<a href="/link" class="btn btn-lg">Click Me</a>
```

### Cards
```html
<!-- Standard card with hover effect -->
<div class="card">
  <h3 class="text-heading">Card Title</h3>
  <p class="text-muted">Card content</p>
</div>
```

### Text Colors
```html
<h1 class="text-heading">Main Heading</h1>
<p class="text-body">Body text</p>
<p class="text-muted">Secondary text</p>
<p class="text-subtle">Tertiary text</p>
```

### Hero Sections
```html
<section class="hero-bg">
  <!-- Hero content -->
</section>
```

### Accent Boxes
```html
<div class="accent-box">
  <h3 class="text-heading">Highlighted Content</h3>
  <p class="text-body">Important information</p>
</div>
```

### Form Inputs
```html
<input type="text" class="input w-full" placeholder="Enter text" />
<textarea class="input w-full resize-none" rows="4"></textarea>
```

### Tags/Badges
```html
<span class="tag">Label</span>
```

## Example Theme Configurations

### Dark Theme Example
```css
--color-bg-body: #111827;
--color-bg-card: #1f2937;
--color-bg-card-hover: #374151;
--color-text-body: #f9fafb;
--color-text-heading: #ffffff;
--color-text-muted: #d1d5db;
--color-border: #374151;
```

### Blue Theme Example
```css
--color-primary: #3b82f6;           /* Blue */
--color-bg-hero: #dbeafe;           /* Light blue */
--color-bg-hero-dark: #bfdbfe;      /* Medium blue */
```

### Green Theme Example
```css
--color-primary: #10b981;           /* Green */
--color-bg-hero: #d1fae5;           /* Light green */
--color-bg-hero-dark: #a7f3d0;      /* Medium green */
```

## Benefits of This System

1. **Single Source of Truth**: All colors defined in one file
2. **Easy Theme Switching**: Change entire theme by updating CSS variables
3. **Consistent Design**: Semantic class names ensure consistency
4. **Maintainable**: No need to search through multiple files for color changes
5. **Flexible**: Can easily add dark mode or multiple theme variants

## Adding New Theme Variables

To add new theme properties:

1. Add the CSS variable in `src/styles/globals.css` under `@theme`:
   ```css
   --color-accent-secondary: #8b5cf6;
   ```

2. Create a utility class in the `@layer components` section:
   ```css
   .text-accent-secondary {
       color: var(--color-accent-secondary);
   }
   ```

3. Use the new class in your components:
   ```html
   <p class="text-accent-secondary">Text</p>
   ```
