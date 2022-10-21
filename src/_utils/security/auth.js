import { redirect } from '@sveltejs/kit';
import { initAuth0 as origInitAuth0 } from '@auth0/nextjs-auth0';
import { auth0Wrapper, auth0WrapperJson } from './wrappers';
import lodash from 'lodash';

const { isNil, isEmpty } = lodash;

export function initAuth0(config) {
	const auth0 = origInitAuth0(config);
	const getSession = auth0WrapperJson((req, res) => auth0.getSession(req, res));

	return {
		getSession: getSession,
		getAccessToken: auth0WrapperJson((req, res, auth0FnOptions) =>
			auth0.getAccessToken(req, res, auth0FnOptions)
		),

		handleLogin: auth0Wrapper((req, res, auth0FnOptions) =>
			auth0.handleLogin(req, res, auth0FnOptions)
		),

		handleLogout: auth0Wrapper((req, res, auth0FnOptions) =>
			auth0.handleLogout(req, res, auth0FnOptions)
		),

		handleCallback: auth0Wrapper((req, res, auth0FnOptions) =>
			auth0.handleCallback(req, res, auth0FnOptions)
		),

		handleProfile: auth0Wrapper((req, res, auth0FnOptions) =>
			auth0.handleProfile(req, res, auth0FnOptions)
		),

		withPageAuthRequired(opts) {
			return async (loadParams) => {
				const { user } = await loadParams.parent();
				if (user.isAuthenticated === true) {
					if (!isNil(user) && !isEmpty(user)) {
						const [provider] = user.baseUser.sub.split('|');
						if (provider !== 'twitter') {
							if (user.email_verified === false) {
								throw redirect(307, `/verify-account`);
							}
						}
					}

					if (opts?.load && typeof opts?.load === 'function') {
						return opts?.load(loadParams);
					} else {
						return {};
					}
				} else {
					const { url } = loadParams;
					const queryString = url.searchParams.toString();

					const returnUrl =
						opts?.returnTo || queryString ? `${url.pathname}?${queryString}` : url.pathname;

					throw redirect(307, `/login-redirect/?returnTo=${returnUrl}`);
				}
			};
		},

		withApiAuthRequired: (route, opts = {}) => {
			return (svelteReq) => {
				if (
					svelteReq.locals.isAuthenticated &&
					svelteReq.locals.user &&
					svelteReq.locals.auth0Session
				) {
					// Already populated in hooks.ts handle() function, so we don't need to do any work here
					return route(svelteReq);
				}

				const session = getSession(svelteReq);

				if (session && session.user) {
					svelteReq.locals.auth0Session = session;
					svelteReq.locals.user = {
						...svelteReq.locals.user,
						...session.user
					};

					svelteReq.locals.isAuthenticated = true;
					return route(svelteReq);
				} else if (opts.unauthHandler && typeof opts.unauthHandler === 'function') {
					return opts.unauthHandler(svelteReq);
				} else {
					return {
						status: 401,
						body: opts.unauthJson || {
							error: 'not_authenticated',
							description: 'The user does not have an active session or is not authenticated'
						}
					};
				}
			};
		}
	};
}
