/* eslint-disable no-undef */
module.exports = {
  content: ['./src/index.html', './src/**/*.svelte'],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
};
