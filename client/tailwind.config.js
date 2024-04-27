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
        // "Custom":["Roboto Condensed"," sans-serif"],
        "Cursive":["Cedarville Cursive", "cursive"]
        // "Custom":["Dosis","sans-serif"]
      }
    },
  },
  plugins: [],
}

