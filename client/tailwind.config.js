/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Custom':[ "Madimi One"," sans-serif"],
        "Cursive":["Cedarville Cursive", "cursive"]
      }
    },
  },
  plugins: [],
}

