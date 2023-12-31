/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '7xl': 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      },
      backgroundImage: {
        'hero-bg': "url('/src/assets/sea-bg.jpg')",
      },
    },
  },
  plugins: [],
};
