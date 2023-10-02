import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';

import pkg from './package.json';

const config = ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const sentryConfig = {
		sourceMapsUploadOptions: {
			org: 'that-conference',
			project: 'that-us',
			release: pkg.version,
			authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
			url: 'https://sentry.io',
			cleanArtifacts: true,
			rewrite: false,
			// vite overrides NODE_ENV to production when running 'vite build'
			uploadSourceMaps: process.env.PUBLIC_VERCEL_ENV === 'production',
			deploy: {
				env: 'production'
			},
			setCommits: {
				auto: true,
				ignoreMissing: true
			},
			sourceMaps: {
				assets: ['./.svelte-kit/output'],
				ignore: ['node_modules']
			},
			debug: false,
			dryRun: false
		}
	};

	return defineConfig({
		plugins: [sentrySvelteKit(sentryConfig), sveltekit()],
		build: {
			sourcemap: true
		}
	});
};

export default config;
