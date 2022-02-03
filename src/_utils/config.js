import { browser } from '$app/env';

function configMissing(configKey) {
	throw new Error(`Missing required environment varable: ${configKey}`);
}

export default {
	hostURL: import.meta.env.VITE_HOST_URL || 'https://that.us',
	nodeEnv: process.env.NODE_ENV,
	version: '2.1.0',
	eventId: 'YWavA70szR8rxSwrLJaL',
	eventSlug: 'thatus/daily',
	api: {
		cache: 'https://that.graphcdn.app/',
		direct: import.meta.env.VITE_THAT_API || configMissing('VITE_THAT_API')
	},
	ogImageApi: import.meta.env.VITE_THAT_OG_IMAGE_API || 'https://og-image.that.tech/og-image',
	profileImageApi: 'https://api.that.tech/profile',
	defaultProfileImage:
		'https://images.that.tech/members/person-placeholder.jpg?auto=format&fit=facearea&facepad=10&mask=ellipse&h=250&w=250&q=50&dpr=2',
	stripeKey: import.meta.env.VITE_STRIPE_PK_KEY || configMissing('VITE_STRIPE_PK_KEY'),
	process: import.meta.env
};

export const securityConfig = () => {
	const config = {
		clientID: import.meta.env.VITE_AUTH0_CLIENT_ID || configMissing('VITE_AUTH0_CLIENT_ID'),
		baseURL: import.meta.env.VITE_AUTH0_BASE_URL || `https://that.us`,
		issuerBaseURL: `https://auth.that.tech`,

		authorizationParams: {
			scope: import.meta.env.VITE_AUTH0_SCOPE || 'openid profile email offline_access',
			audience: import.meta.env.VITE_AUTH0_AUDIENCE || 'https://api.that.tech/graphql'
		},

		routes: {
			login: '/login/',
			callback: '/api/auth/callback',
			redirectUri: import.meta.env.VITE_REDIRECT_URI || configMissing('VITE_REDIRECT_URI'),
			postLogoutRedirectUri:
				import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI ||
				configMissing('VITE_POST_LOGOUT_REDIRECT_URI')
		}
	};

	// private to server
	if (!browser) {
		config.baseURL = process.env['AUTH0_BASE_URL'] || 'https://that.us';
		config.clientSecret =
			process.env['AUTH0_CLIENT_SECRET'] || configMissing('AUTH0_CLIENT_SECRET');
		config.secret = process.env['AUTH0_SECRET'] || configMissing('AUTH0_CLIENT_SECRET');
	}

	return config;
};

export const logging = {
	dsn: 'https://15d4b436dc0a4366a0ac388c65772926@o235190.ingest.sentry.io/5357492',
	environment: process.env.NODE_ENV,
	logRocket: 'c59zeb/that-prod'
};

export const debug = {
	xstate: false
};

export const imageCrops = {
	profile: '?mask=ellipse&w=500&h=500&fit=crop&q=75&fm=jpg'
};

export const events = {
	next: {
		tx: {
			slug: 'tx/2022'
		},
		wi: {
			slug: 'wi/2022'
		}
	}
};

export const kalahari = {
	passkey: {
		wi: {
			opens: '04/11/2022',
			closes: '07/01/2022',
			url: 'https://book.passkey.com/e/xxx'
		},
		tx: {
			opens: '01/01/2022',
			closes: '05/01/2022',
			url: 'https://book.passkey.com/e/50279810'
		}
	},
	speakerPasskey: {
		'wi/2022': {
			bookingUrl: 'https://book.passkey.com/e/xx',
			start: '07/24/2022',
			end: '07/28/2022',
			blockCloseDate: '07/01/2022'
		},
		'tx/2022': {
			bookingUrl: 'https://book.passkey.com/e/50279812',
			start: '05/22/2022',
			end: '05/26/2022',
			blockCloseDate: '05/01/2022',
			discountCode: 'THATX'
		}
	}
};
