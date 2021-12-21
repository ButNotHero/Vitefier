import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: {
    prefix: 's',
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1B1B1B',
          600: '#333333',
          500: '#545454',
          400: '#5a5a5a',
          350: '#696969',
          300: '#a4a4a4',
          200: '#a1a1a1',
        },
      },
      fontFamily: {
        montserrat: 'Montserrat, Arial, sans-serif',
      },
    },
  },
  shortcuts: {
    'border-header': 'border-solid border-gray-900',
    'container-pl': 'pl-45px',
    'container-pr': 'pr-45px',
    'container-px': 'container-pl container-pr',
    'flex-c-b': 'flex items-center justify-between',
    'flex-c-e': 'flex items-center justify-end',
    'flex-c': 'flex items-center',
    'flex-e': 'flex items-end',
    'absolute-center': 'absolute m-auto top-0 left-0 bottom-0 right-0',
    'absolute-vertical': 'absolute top-1/4 translate-y-1/4',
    layout: 'flex flex-col min-h-screen',
  },
  plugins: [require('@windicss/plugin-scrollbar')],
});
