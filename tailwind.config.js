/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          pink: '#E4405F',
          purple: '#833AB4',
          orange: '#F56040',
          yellow: '#FCCC63'
        }
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #F56040, #E4405F, #833AB4)',
        'instagram-gradient-hover': 'linear-gradient(45deg, #F77050, #E55070, #9440C4)'
      }
    },
  },
  plugins: [],
}