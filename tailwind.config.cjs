/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'inconsolata': ['Inconsolata', 'monospace'],
      },
    },
  },
  plugins: [],
}