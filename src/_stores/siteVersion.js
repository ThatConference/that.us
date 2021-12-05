import { browser } from '$app/env';
import { readable, writable } from 'svelte/store';
import config from '$utils/config';

export const siteVersion = readable(config.version);
export const showReleaseNotes = writable(false);

function init() {
	const versionLastSeen = browser ? window.localStorage.getItem('versionLastSeen') : '1.0.0';
	if (config.version !== versionLastSeen) showReleaseNotes.set(true);
}

init();
