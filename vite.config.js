import { sveltekit } from '@sveltejs/kit/vite';
import viteSentry from 'vite-plugin-sentry';
import pkg from './package.json';

const sentryConfig = {
	url: 'https://sentry.io',
	authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
	org: 'that-confernece',
	project: 'thatus',
	release: pkg.version,
	deploy: {
		env: 'production'
	},
	setCommits: {
		auto: true
	},
	sourceMaps: {
		include: ['./dist/assets'],
		ignore: ['node_modules'],
		urlPrefix: '~/assets'
	}
};

const config = {
	plugins: [viteSentry(sentryConfig), sveltekit()],
	build: {
		sourcemap: true
	}
};

export default config;
