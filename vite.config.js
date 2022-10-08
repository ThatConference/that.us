import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	compilerOptions: {
		enableSourcemap: true
	}
};

export default config;
