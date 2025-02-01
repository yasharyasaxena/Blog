/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "30": "30rem",
      },
      height: {
        '85vh': '85vh',
        '49.75': '49.75rem',
      },
      colors: {
        "dark-purple": "#081A51",
        "light-white": 'rgba(255, 255, 255, 0.18)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(91deg, #2E4CEE 9.91%, #221EBF 53.29%, #040F75 91.56%)',
      }
    },
  },
  plugins: [],
}