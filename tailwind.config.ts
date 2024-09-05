import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        navy: '#072AC8',
        blue: '#1E96FC',
        mediumblue: '#7AC2FF',
        lightblue: '#E9F5FF',
        skyblue: '#C8E0F5',
        mint: '#46E5DC',
        yellow: '#FFF16C',
        darkgray: '#5B5C5E',
        gray: {
          DEFAULT: '#8C8C8C',
          100: '#f3f4f6',
          200: '#e5e7eb',
        },
        lightgray: '#999999',
      },
      borderRadius: {
        '8': '8px',
        '12': '12px',
        '16': '16px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': ' linear-gradient(130deg, var(--tw-gradient-stops))',
      },
      width: {
        '150': '150%',
      },
      boxShadow: {
        'header-bottom': '0px 4px 4px -1px rgb(0 0 0 / 0.1)',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '1/1': '1 / 1',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
export default config
