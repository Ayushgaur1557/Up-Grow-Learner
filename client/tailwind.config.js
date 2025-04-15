// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // 👈 Important!
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // or wherever your files live
    ],
    theme: {
      extend: {
        // optional: add custom colors, fonts, or CSS vars here
      },
    },
    plugins: [
      require('tailwindcss-animate'),
    ],
  }
  