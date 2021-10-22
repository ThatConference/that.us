module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
		"no-unused-vars": [2, {"args": "all", "argsIgnorePattern": "^_"}]
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
