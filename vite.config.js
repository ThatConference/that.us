import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
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
};

export default config;
