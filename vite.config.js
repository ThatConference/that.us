import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import viteSentry from 'vite-plugin-sentry';
import pkg from './package.json';

const config = ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const sentryConfig = {
		url: 'https://sentry.io',
		authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
		org: 'that-conference',
		project: 'that-us',
		release: pkg.version,
		deploy: {
			env: 'production'
		},
		setCommits: {
			auto: true,
			ignoreMissing: true
		},
		sourceMaps: {
			include: ['./.svelte-kit/output'],
			ignore: ['node_modules']
		},
		cleanArtifacts: true,
		debug: false
	};

	return defineConfig({
		plugins: [sveltekit(), viteSentry(sentryConfig)],
		build: {
			sourcemap: true
		}
	});
};

export default config;
