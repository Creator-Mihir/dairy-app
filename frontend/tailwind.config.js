/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dairy: {
          cream: "#FDFBF7",    // Soft warm white background
          gold: "#D4AF37",     // Premium gold for buttons/accents
          dark: "#1A1A1A",     // Rich black/grey for text/nav
          accent: "#C5A028",   // Slightly darker gold for hover effects
          light: "#F5F0E1",    // Slightly darker cream for cards
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern font
      }
    },
  },
  plugins: [],
}