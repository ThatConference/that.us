/* eslint-disable no-undef */
import { onMount, setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import createAuth0Client from '@auth0/auth0-spa-js';

import { goto } from '$app/navigation';
import { securityConfig } from '$utils/config';
import meApi from '$dataSources/api.that.tech/me';

import logEvent from './eventTrack';

export const token = writable(undefined);
const isLoading = writable(true);
const user = writable({});
const thatProfile = writable({});
const isAuthenticated = writable(false);
const refreshRate = 10 * 60 * 60 * 1000;

let AUTH_KEY = {};

function createAuth() {
	let auth0 = null;
	let intervalId = undefined;

	onMount(async () => {
		auth0 = await createAuth0Client(securityConfig);
		securityConfig.redirect_uri = `${window.location.origin}/login-success`;
		let redirectResult;

		const query = window.location.search;

		if (query.includes('code=') && query.includes('state=')) {
			redirectResult = await auth0.handleRedirectCallback();
		}

		// todo.. all of these could be in a promise.all.. to speed up those calls.
		if (await auth0.isAuthenticated()) {
			isAuthenticated.set(true);

			// set the base profile from auth0
			user.set(await auth0.getUser());
			token.set(await auth0.getTokenSilently());

			// refresh token after specific period or things will stop
			// working. Useful for long-lived apps like dashboards.
			intervalId = setInterval(async () => {
				authToken.set(await auth0.getTokenSilently());
			}, refreshRate);

			// set the THAT membership profile
			const { queryMe } = meApi();
			thatProfile.set(await queryMe());

			if (redirectResult)
				goto(`${redirectResult.appState.pathname}${redirectResult.appState.search}`);
		}

		isLoading.set(false);

		// clear token refresh interval on component unmount
		return () => {
			intervalId && clearInterval(intervalId);
		};
	});

	async function login(documentReferrer, signup = false) {
		const authClient = await createAuth0Client(securityConfig);
		const appState = {
			pathname: documentReferrer,
			search: window.location.search
		};

		let authParams = {
			redirect_uri: securityConfig.redirect_uri,
			appState
		};

		if (signup) {
			authParams = {
				...authParams,
				screen_hint: 'signup'
			};
		}

		logEvent('login');
		return authClient.loginWithRedirect(authParams);
	}

	async function logout() {
		logEvent('logout');

		const authClient = await createAuth0Client(securityConfig);
		authClient.logout({
			returnTo: window.location.origin
		});
	}

	// I think this will fail on the else..
	async function refresh() {
		if (await auth0.isAuthenticated()) {
			const { queryMe } = meApi();
			thatProfile.set(await queryMe());
		}
	}

	const auth = {
		isLoading,
		isAuthenticated,
		user,
		thatProfile,
		token,
		login,
		logout,
		refresh
	};

	setContext(AUTH_KEY, auth);
	return auth;
}

function getAuth() {
	return getContext(AUTH_KEY);
}

export { createAuth, getAuth };
