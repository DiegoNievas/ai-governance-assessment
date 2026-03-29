/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atturra: {
          50: '#f0f5fa',
          100: '#e1ecf4',
          200: '#c3dae9',
          300: '#95bed9',
          400: '#609bc3',
          500: '#3e82ac',
          600: '#2d6890',
          700: '#255476',
          800: '#224762',
          900: '#203d52',
          950: '#002845', // Atturra Navy
        },
        generic: {
          50: '#f4f6f8',
          100: '#e3e8ef',
          200: '#c9d3e1',
          300: '#a3b4cb',
          400: '#758fae',
          500: '#567496',
          600: '#435a78',
          700: '#374962',
          800: '#303f53',
          900: '#2a3545',
          950: '#1c222e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
