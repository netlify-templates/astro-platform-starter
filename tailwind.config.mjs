/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                'primary-content': 'var(--color-primary-content)',
                complementary: 'var(--color-complementary)'
            },
            fontFamily: {
                sans: 'var(--font-sans)'
            },
            backgroundImage: {
                noise: 'var(--background-image-noise)'
            }
        }
    },
    plugins: []
};
