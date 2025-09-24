/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}' ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F59E0B',
        accent: '#10B981',

      },
      fontFamily: {
        sans: [ 'Inter', 'sans-serif' ],
        serif: [ 'Merriweather', 'serif' ],
      },
    },
  },
  plugins: [],
};
