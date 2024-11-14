import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Only enable dark mode when the "dark" class is present
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  darkMode: 'selector',
  plugins: [],
} satisfies Config
