/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            backgroundImage: {
                'grid-pattern': "linear-gradient(to bottom, theme('colors.neutral.950 / 0%'), theme('colors.neutral.950 / 100%')), url('/images/noise.png')"
            },
            colors: {
                neutral: colors.neutral
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    daisyui: {
        themes: [
            {
                lofi: {
                    ...require('daisyui/src/theming/themes')['lofi'],
                    primary: '#ffb454',
                    'primary-content': '#11151c',
                    secondary: '#d95757',
                    info: '#ffb454',
                    'info-content': '#11151c'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
