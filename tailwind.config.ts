import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F4B400',
        darkBg: '#0B1C2D',
      },
    },
  },
  plugins: [],
} satisfies Config
