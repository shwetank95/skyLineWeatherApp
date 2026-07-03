/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14162B',      // deep night base
        dusk: '#2B2E4A',     // secondary dark surface
        dawn: '#FF8F6B',     // coral accent (sunrise/sunset)
        gold: '#FFC857',     // noon gold accent
        slate: '#5B6478',    // muted secondary text
        mist: '#F6F5F1',     // light surface / text on dark
        haze: '#9FA6C1',     // faint labels on dark
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 20px 60px -20px rgba(20, 22, 43, 0.45)',
      },
    },
  },
  plugins: [],
}
