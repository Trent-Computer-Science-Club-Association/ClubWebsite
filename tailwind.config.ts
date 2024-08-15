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
        socials: '#7BD4CB', // Social
        'development-color': '#4DEB91', // Development Color
        'creative-color': '#88EB3D', // Creative Color
        'managerial-color': '#FBD93C', // Managerial Color
        'volunteer-color': '#FAB22D', // Volunteer Color
        'area-header': '#DCD489', // Area Header
        'secondary-green': '#43FFA5', // Secondary Green
      },
    },
  },
  plugins: [],
};
export default config;
