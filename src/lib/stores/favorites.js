import { writable } from 'svelte/store';
import { page } from '$app/stores';
import { browser } from '$app/environment';

import favoritesQueryApi from '$dataSources/api.that.tech/me/favorites/queries';
import favoritesMutationsApi from '$dataSources/api.that.tech/me/favorites/mutations';

const { get } = favoritesQueryApi();
const { toggle: toggleMutation } = favoritesMutationsApi();

const favoritesStore = writable([]);

export async function toggle(sessionId, eventId) {
	let results = false;

	const favorite = await toggleMutation(sessionId, eventId);

	if (favorite) {
		// is toggled
		favoritesStore.update((i) => [...i, favorite]);
		results = true;
	} else {
		// not toggled
		favoritesStore.update((f) => f.filter((i) => i.id !== sessionId));
		results = false;
	}

	return results;
}

async function create() {
	const initalValues = await get();
	favoritesStore.set(initalValues);
}

if (browser) {
	page.subscribe((values) => {
		if (values?.data?.user?.profile) {
			create();
		}
	});
}

export default favoritesStore;
