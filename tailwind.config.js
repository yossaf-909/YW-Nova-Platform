/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        border: 'rgb(var(--border))',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        skin: {
          base: 'rgb(var(--bg) / <alpha-value>)',
          card: 'rgb(var(--card) / <alpha-value>)',
          cardStrong: 'rgb(var(--card-strong) / <alpha-value>)',
          text: 'rgb(var(--text) / <alpha-value>)',
          soft: 'rgb(var(--text-soft) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.22)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
