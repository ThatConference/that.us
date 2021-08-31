/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';

const config = {
	extensions: ['.svelte', '.svx', '.md'],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: 'always',
		vite: {
			resolve: {
				alias: {
					$components: resolve('src/_components'),
					$elements: resolve('src/_elements'),
					$utils: resolve('src/_utils'),
					$dataSources: resolve('src/_dataSources'),
					$stores: resolve('src/_stores'),
					$machines: resolve('src/_machines')
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.svx', '.md'],
			layout: {
				support: './src/_elements/layouts/markdown/Support.svelte'
			}
		})
	]
};

export default config;
