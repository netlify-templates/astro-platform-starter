import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        headings: ['Inter', ...defaultTheme.fontFamily.sans],
        sans: ['Mulish', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
