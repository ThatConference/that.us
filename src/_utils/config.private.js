import { env } from '$env/dynamic/private';

function configMissing(configKey) {
	const message = `Missing required server environment varable: ${configKey}`;
	throw new Error(message);
}

export const securityConfig = () => {
	const config = {
		baseURL: env.AUTH0_BASE_URL || 'https://that.us',
		clientSecret: env.AUTH0_CLIENT_SECRET || configMissing('AUTH0_CLIENT_SECRET'),
		secret: env.AUTH0_SECRET || configMissing('AUTH0_CLIENT_SECRET')
	};

	return config;
};
