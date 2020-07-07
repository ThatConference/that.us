/* eslint-disable no-undef */
/* eslint-disable svelte3/lint-template */
module.exports = {
  content: ['./src/index.html', './src/**/*.svelte'],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
};
