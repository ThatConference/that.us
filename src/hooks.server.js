import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0Provider from '@auth/core/providers/auth0';

import { logging } from '$utils/config.public';
import { parseOnly } from '$utils/security/svelteAuth/parseJwt';

import { securityConfig as publicConfig } from '$utils/config.public';
import { securityConfig as privateConfig } from '$utils/config.private';

const { clientID, issuerBaseURL } = publicConfig();
const { clientSecret, secret } = privateConfig();

Sentry.init({
	dsn: logging.dsn,
	environment: logging.environment,
	tracesSampleRate: 1
});

const loginRedirectPaths = [
	'/my',
	'/speakers',
	'/partners/leads',
	'/partners/my-network',
	'/event/',
	'/join',
	'/activities/clone',
	'/activities/create',
	'/activities/edit',
	'/news/submit'
];

async function authorization({ event, resolve }) {
	if (
		loginRedirectPaths.reduce((a, c) => {
			if (event.url.pathname.startsWith(c)) {
				a = true;
			}
			return a;
		}, false)
	) {
		const session = await event.locals.getSession();
		if (!session?.user) {
			let toPath = event.url.pathname;
			if (event.url.searchParams.size > 0) {
				toPath += `?${event.url.searchParams.toString()}`;
			}
			throw redirect(303, `/login-redirect?returnTo=${toPath}`);
		}
	}

	return resolve(event);
}

const authConfig = {
	providers: [
		Auth0Provider({
			id: 'auth0',
			name: 'Auth0',
			clientId: clientID,
			clientSecret,
			issuer: issuerBaseURL,
			wellKnown: 'https://auth.that.tech/.well-known/openid-configuration',
			authorization: {
				params: {
					audience: 'https://api.that.tech/graphql',
					scope: 'openid profile email offline_access'
				}
			}
		})
	],
	secret,
	debug: false,
	session: {
		maxAge: 3600 * 24 // 1440 mins, 1 day
	},
	callbacks: {
		redirect(redirectGoo) {
			const { url, baseUrl } = redirectGoo;
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		jwt(jwtGoo) {
			const { account, token } = jwtGoo;
			if (account) {
				token.accessToken = account.access_token;
				token.idToken = account.id_token;
			}
			return token;
		},
		session(sessionGoo) {
			const { session, token } = sessionGoo;
			session.accessToken = token.accessToken;
			session.idToken = token.idToken;
			session.user.id = token.sub;
			session.user.sub = token.sub;
			const payload = parseOnly(token.accessToken);
			if (payload) {
				const { permissions } = payload;
				if (permissions && Array.isArray(permissions)) {
					session.user.permissions = permissions;
				}
			}
			return session;
		}
	}
};

export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle(), SvelteKitAuth(authConfig), authorization);
