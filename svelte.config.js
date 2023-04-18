import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { resolve } from 'path';

import mdsvexConfig from './mdsvex.config.js';

//todo this needs to get checked on the build rigs
const dev = process.env.NODE_ENV === 'development' ? true : false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		serviceWorker: {
			register: false
		},
		adapter: adapter(),
		alias: {
			$components: resolve('./src/_components'),
			$elements: resolve('./src/_elements'),
			$utils: resolve('./src/_utils'),
			$dataSources: resolve('./src/_dataSources'),
			$stores: resolve('./src/_stores'),
			$machines: resolve('./src/_machines'),
			$blog: resolve('./src/_blog')
		},
		version: {
			name: process.env?.npm_package_version || '0.0.0'
		}
	},
	preprocess: !dev
		? [
				preprocess({
					sourceMap: true,
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
