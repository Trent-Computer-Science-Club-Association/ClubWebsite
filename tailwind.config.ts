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
        'active-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-1': '#4db6ac', // TODO: Decide on a color for this
        'hover-2': '#89B4FA', // TODO: Decide on a color for this
        'event-banner': '#5E18EB', // Event Banner Background
        'newsItem-color': '#135b3f', // a shade of green
        socials: '#7BD4CB', // Social
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate-y-0 rotate-3',
            '-webkit-transform': 'translateY(0) rotate(3deg)',
          },
          '50%': {
            transform: '-translate-y-5 rotate-0',
            '-webkit-transform': 'translateY(-1.25rem) rotate(0deg)',
          },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        motorblock: ['Motorblock', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
