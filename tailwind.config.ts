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
        'color-3': '#222', // Dark Gray
        'txt-1': '#fff',
        'txt-4': '#ddd',
        'active-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-2': '#89B4FA', // TODO: Decide on a color for this
        'event-banner': '#5E18EB', // Event Banner Background
        'newsItem-color': '#135b3f', // a shade of green
        socials: '#7BD4CB', // Social
      },
      spacing: {
        '136': '30rem',
      },
      aspectRatio: {
        event: '2 / 1', // This controls the aspect ratio of event elements, do not touch you will probably break stuff.
      },
      boxShadow: {
        // Box Shadow - based on https://codepen.io/sdthornton/pen/wBZdXq
        l1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        l1Hover: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      },
      gridAutoColumns: {
        '4': 'minmax(1rem, 1rem)',
      },
    },
  },
  plugins: [],
};
export default config;
