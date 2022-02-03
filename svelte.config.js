import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
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
		vite: {
			build: {
				sourcemap: true
			},
			resolve: {
				alias: {
					$components: resolve('src/_components'),
					$elements: resolve('src/_elements'),
					$utils: resolve('src/_utils'),
					$dataSources: resolve('src/_dataSources'),
					$stores: resolve('src/_stores'),
					$machines: resolve('src/_machines'),
					$blog: resolve('src/_blog')
				}
			}
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
