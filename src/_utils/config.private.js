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

export const newsletterConfig = {
	portalId: env.NEWSLETTER_PORTAL_ID || configMissing('NEWSLETTER_PORTAL_ID'),
	formId: env.NEWSLETTER_FORM_ID || configMissing('NEWSLETTER_FORM_ID')
};

export const recaptchaConfig = {
	apiKey: env.RECAPTCHA_API_KEY || configMissing('RECAPTCHA_API_KEY'),
	projectId: env.GC_PROJECT_ID || configMissing('GC_PROJECT_ID')
};
