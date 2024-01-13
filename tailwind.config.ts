import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['var(--font-ubuntu)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        'hod-primary': '#273472',
        'hod-secondary': '#D01D22',
        'hod-black1': '#151723',
        'hod-black2': '#212327',
        'hod-text-gray1': '#535559',
        'hod-text-gray2': '#8D8F94',
        'hod-bg-gray': '#E4E5E7',
        'hod-border-gray': '#AFB1B6',
        'hod-red': '#B54708',
        'hod-bg-red-light': '#FFFAEB',
        'hod-bg-red-transparent': 'rgba(241, 237, 237, 0.40)',
        'hod-border-red': '#E09194',
      },
      lineHeight: {
        '4.5': '1.125rem',
      }
    },
  },
  plugins: [],
}
export default config
