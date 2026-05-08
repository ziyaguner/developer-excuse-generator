/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 5px rgba(239, 68, 68, 0.8))' },
          '50%': { opacity: 0.8, filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 1))' },
        }
      }
    },
  },
  plugins: [],
}
