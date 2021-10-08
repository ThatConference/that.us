/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import vercelAdapter from '@sveltejs/adapter-vercel';

//todo this needs to get checked on the build rigs
const dev = process.env.NODE_ENV === 'development' ? true : false;
console.log('process.env.NODE_ENV', dev);

const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: 'always',
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
		adapter: vercelAdapter()
	},
	preprocess: !dev
		? [
				mdsvex(mdsvexConfig),
				preprocess({
					postcss: true
				})
		  ]
		: [mdsvex(mdsvexConfig)]
};

export default config;
