/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,woff2}',
    './index.html',
    './for-on.html',
    './404.html',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'titillium': ["'Titillium Web'", 'sans-serif'],
      }
    },
    screens: {
      md: '600px',
      lg: '900px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
