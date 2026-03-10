import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'action-teal': '#00A896',
        'sunny-yellow': '#FFC107',
        'energetic-orange': '#FF6B35',
        'kind-purple': '#9C27B0',
        'soft-cream': '#FFF8DC',
        'gentle-gray': '#F5F5F5',
      },
      fontFamily: {
        heebo: ['var(--font-heebo)'],
      },
    },
  },
  plugins: [],
}
export default config
