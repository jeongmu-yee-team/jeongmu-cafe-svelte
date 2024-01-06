module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};
