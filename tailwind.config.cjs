module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        cafe: ['Do Hyeon', 'IBM Plex Sans KR', 'sans-serif'],
        admin: ['Noto Sans KR', 'IBM Plex Sans KR', 'sans-serif'],
      },
      flexGrow: {
        6: '6',
        4: '4',
        5: '5',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};
