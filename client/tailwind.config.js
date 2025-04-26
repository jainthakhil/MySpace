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
          darkBackground: '#123458',
          truckGray: '#7D7C7C',
        }
      },
    },
    plugins: [],
  }