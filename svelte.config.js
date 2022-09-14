import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

//todo this needs to get checked on the build rigs
const dev = process.env.NODE_ENV === 'development' ? true : false;
console.log('process.env.NODE_ENV', dev);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		trailingSlash: 'always',
		serviceWorker: {
			register: false
		},
		adapter: adapter()
	},
	preprocess: !dev
		? [
				preprocess({
					postcss: true,
					preserve: ['ld+json']
				}),
				mdsvex(mdsvexConfig)
		  ]
		: [
				preprocess({
					preserve: ['ld+json']
				}),
				mdsvex(mdsvexConfig)
		  ]
};

export default config;
