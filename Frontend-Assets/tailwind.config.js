/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8', // Main primary color
          light: '#3B82F6',   // Light variant
          dark: '#1E40AF',    // Dark variant
        },
        dark: {
          2: '#1E293B', // Custom dark background color
        },
      },
    },
  },
  plugins: [],
};
