/* eslint-disable global-require */
/* eslint-disable no-undef */

const tailwindcss = require('tailwindcss');

const plugins =
  process.env.NODE_ENV === 'production'
    ? [
        tailwindcss('./tailwind.config.js'),
        require('@tailwindcss/ui'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss'),
      ]
    : [tailwindcss('./tailwind.config.js')];

module.exports = { plugins };
