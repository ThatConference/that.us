/* eslint-disable no-undef */
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

import createAuth0Client from '@auth0/auth0-spa-js';
import { getClient } from '@urql/svelte';

import { securityConfig } from '$utils/config';
import meApi from '$dataSources/api.that.tech/me';
import logEvent from './eventTrack';

securityConfig.redirect_uri = `https://${page.host}/login-success`;

export const user = writable({});
export const thatProfile = writable({});
export const token = writable('');
export const isAuthenticated = writable(false);
// export const auth0Promise = createAuth0Client(securityConfig);
let auth0Promise;

export const logout = async () => {
	const auth0 = await auth0Promise;

	logEvent('logout');

	await auth0.logout({
		returnTo: window.location.origin
	});
};

export const login = async (documentReferrer, signup = false) => {
	const auth0 = await auth0Promise;

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
	await auth0.loginWithRedirect(authParams);
};

export async function setupAuth(client) {
	onMount(async () => {
		console.log('1');
		auth0Promise = createAuth0Client(securityConfig);
		const auth0 = await auth0Promise;
		const query = window.location.search;

		let redirectResult;

		if (query.includes('code=') && query.includes('state=')) {
			redirectResult = await auth0.handleRedirectCallback();
		}

		if (await auth0.isAuthenticated()) {
			isAuthenticated.set(true);

			// set the base profile from auth0
			console.log('asdf');
			user.set(await auth0.getUser());
			token.set(await auth0.getTokenSilently());

			// set the THAT membership profile
			const { queryMe } = meApi(client);
			thatProfile.set(await queryMe(client));

			if (redirectResult)
				goto(`${redirectResult.appState.pathname}${redirectResult.appState.search}`, {
					replace: true
				});
		}
	});
}

export async function refreshMe() {
	const auth0 = await auth0Promise;

	if (await auth0.isAuthenticated()) {
		const { queryMe } = meApi(getClient());
		thatProfile.set(await queryMe(getClient()));
	}
}
