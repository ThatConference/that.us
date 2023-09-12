import { env } from '$env/dynamic/public';

function configMissing(configKey) {
	const message = `Missing required public environment varable: ${configKey}`;
	throw new Error(message);
}

export default {
	hostURL: env.PUBLIC_HOST_URL || 'https://that.us',
	nodeEnv: env.NODE_ENV,
	version: '3.2.1',
	eventId: 'YWavA70szR8rxSwrLJaL',
	eventSlug: 'thatus/daily',
	api: {
		cache: env.PUBLIC_CACHE_THAT_API || 'https://that.graphcdn.app/',
		direct: env.PUBLIC_THAT_API || configMissing('PUBLIC_THAT_API')
	},
	ogImageApi: env.PUBLIC_THAT_OG_IMAGE_API || 'https://og-image.that.tech/og-image',
	profileImageApi: 'https://fn.that.tech/profile',
	defaultProfileImage:
		'https://images.that.tech/members/person-placeholder.jpg?auto=format&fit=facearea&facepad=10&mask=ellipse&h=250&w=250&q=50&dpr=2',
	stripeKey: env.PUBLIC_STRIPE_PK_KEY || configMissing('PUBLIC_STRIPE_PK_KEY')
};

export const securityConfig = () => {
	const config = {
		clientID: env.PUBLIC_AUTH0_CLIENT_ID || configMissing('PUBLIC_AUTH0_CLIENT_ID'),
		baseURL: env.PUBLIC_AUTH0_BASE_URL || `https://that.us`,
		issuerBaseURL: `https://auth.that.tech`,

		authorizationParams: {
			scope: env.PUBLIC_AUTH0_SCOPE || 'openid profile email offline_access',
			audience: env.PUBLIC_AUTH0_AUDIENCE || 'https://api.that.tech/graphql'
		},

		routes: {
			login: '/login/',
			callback: '/api/auth/callback',
			redirectUri: env.PUBLIC_REDIRECT_URI || configMissing('PUBLIC_REDIRECT_URI'),
			postLogoutRedirectUri:
				env.PUBLIC_POST_LOGOUT_REDIRECT_URI || configMissing('PUBLIC_POST_LOGOUT_REDIRECT_URI')
		}
	};

	return config;
};

export const logging = {
	dsn: 'https://15d4b436dc0a4366a0ac388c65772926@o235190.ingest.sentry.io/5357492',
	environment: env.NODE_ENV
};

export const debug = {
	xstate: false
};

export const recaptcha = {
	siteKey: '6Lc0xrMmAAAAAHVlanzsS01OjAzlvHasXQMevfuV',
	threshold: 0.5
};

export const analytics = {
	google: 'UA-21705613-11'
};

export const imageCrops = {
	profile: '?mask=ellipse&w=500&h=500&fit=crop&q=75&fm=jpg'
};

export const claimCodes = [
	{
		72924: {
			eventSlug: 'wi/2024',
			eventTitle: 'THAT Conference Wisconsin'
		}
	},
	{
		13024: {
			eventSlug: 'tx/2024',
			eventTitle: 'THAT Conference Texas'
		}
	}
];

export const events = {
	next: {
		tx: {
			slug: 'tx/2024'
		},
		wi: {
			slug: 'wi/2024'
		}
	}
};

export const kalahari = {
	passkey: {
		wi: {
			opens: '03/27/2023',
			closes: '06/21/2023',
			url: 'https://book.passkey.com/e/50528959'
		},
		tx: {
			opens: '09/13/2023',
			closes: '01/08/2024',
			url: 'https://book.passkey.com/e/50671911'
		}
	},
	speakerPasskey: {
		'wi/2024': {
			bookingUrl: 'https://book.passkey.com/e/50528993',
			start: '03/27/2023',
			end: '06/21/2023',
			blockCloseDate: '06/21/2023',
			accessCode: null
		},
		'tx/2024': {
			bookingUrl: 'https://book.passkey.com/e/50671918',
			start: '09/13/2023',
			end: '01/08/2024',
			blockCloseDate: '01/08/2023',
			accessCode: 'THATSPEAK'
		}
	}
};
