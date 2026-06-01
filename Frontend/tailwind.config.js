/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-dot': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};
