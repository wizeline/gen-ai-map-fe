/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./remix.config.js"
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#21282C',
        'white': '#FFFFFF',
        'base-wizeline': '#E93D44',
        'header': '#17191C',
        'footer': '#383C41',
      },
      boxShadow: {
        'custom-light': '0px 1px 3px 1px rgba(17, 24, 35, 0.15)',
        'custom-dark': '0px 1px 2px 0px rgba(17, 24, 35, 0.30)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}