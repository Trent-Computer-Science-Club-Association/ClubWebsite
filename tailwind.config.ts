import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        // TODO: Develop a better naming scheme - dont name after color because theme change
        'color-1': '#0f3b26', // Main Green
        'color-2': '#f9f7f7', // NavBar Off White
        'color-3': '#575555', // Aside Gray
        'color-4': '#222',    // Background Gray
        'active-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-2': '#89B4FA', // TODO: Decide on a color for this
        'event-banner': '#5E18EB', // Event Banner Background
        socials: '#7BD4CB', // Social
      },
    },
  },
  plugins: [],
};
export default config;
