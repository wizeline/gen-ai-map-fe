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
        'primary': '#203449',
        'top-nav-border': '#4D5D6D',
        'secondary': '#111823CC',
        'blue300': '#A7C7DC',
        'blue700': '#4D5D6D',
      },
      boxShadow: {
        'custom-light': '0px 1px 3px 1px rgba(17, 24, 35, 0.15)',
        'custom-dark': '0px 1px 2px 0px rgba(17, 24, 35, 0.30)',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}