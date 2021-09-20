/* eslint-disable no-undef */
import { writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

import meApi from '$dataSources/api.that.tech/me';

const token = writable(undefined);
const user = writable({});
const thatProfile = writable({});
const isAuthenticated = writable(false);

let AUTH_KEY = {};

function createAuth() {
	async function refresh() {
		if (await auth0.isAuthenticated()) {
			const { queryMe } = meApi();
			thatProfile.set(await queryMe());
		}
	}

	const auth = {
		isAuthenticated,
		user,
		thatProfile,
		token,
		refresh
	};

	setContext(AUTH_KEY, auth);
	return auth;
}

function getAuth() {
	return getContext(AUTH_KEY);
}

export { createAuth, getAuth };
