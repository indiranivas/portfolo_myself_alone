/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        surface: '#111111',
        paper: '#F2F0EA',
        mute: '#8A8680',
        accent: '#2DD4BF',
        hot: '#F43F5E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        outback: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
