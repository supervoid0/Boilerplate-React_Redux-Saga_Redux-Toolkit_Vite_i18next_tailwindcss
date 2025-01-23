/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Liberation Sans', // Liberation Sans font family
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        tiny: '0.6rem',
      },
      maxWidth: {
        56: '14rem', // Custom maxWidth value for max-w-56
      },
      colors: {
        'orange-sp': '#FD6502',
        // 'green-sp': '#70b53d'
        'green-sp': '#5cac3d',
        'green-sp-lite': '#70b53d',
      },
      width: {
        '500px': '500px',
      },
    },
  },
  plugins: [],
};
