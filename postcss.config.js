/* eslint-disable global-require */
/* eslint-disable no-undef */

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [tailwindcss('./tailwind.config.js')],
};

// const plugins =
//   process.env.NODE_ENV === 'production'
//     ? [
//         require('tailwindcss'),
//         require('@tailwindcss/ui'),
//         require('autoprefixer'),
//         require('@fullhuman/postcss-purgecss'),
//       ]
//     : [require('tailwindcss')];

// ---
// module.exports = { plugins };

// const purgecss = require('@fullhuman/postcss-purgecss')({
//   content: ['./src/**/*.html', './src/**/*.svelte'],

//   whitelistPatterns: [/svelte-/],

//   defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
// });

// const production = !process.env.ROLLUP_WATCH;

// module.exports = {
//   plugins: [require('tailwindcss'), ...(production ? [purgecss] : [])],
// };
