/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: '#4d331f',
        light: '#baa89b',
        darker: '#857468',
        darkGreen: '#1f3f2a',
        lightGreen: '#4e6f58',
      }
    },
  },
  plugins: [],
}

