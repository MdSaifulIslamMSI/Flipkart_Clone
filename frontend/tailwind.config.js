// Tailwind CSS configuration — defines the Lumina design tokens
// (colors, animations) shared across the entire frontend.

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lumina brand palette (purple-based)
        primary: '#6D28D9',
        'primary-dark': '#5B21B6',
        secondary: '#1F2937',
        accent: '#F472B6',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'bounce-short': 'bounce-short 1s ease-in-out 1',
      },
    },
  },
  plugins: [],
};
