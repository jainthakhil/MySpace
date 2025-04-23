/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            dosis: ['Dosis', 'sans-serif'],
          },
        backdropBlur: {
          xs: '2px',
        },
        colors:{
          brandColor: '#545454',
        }
      },
    },
    plugins: [],
  }