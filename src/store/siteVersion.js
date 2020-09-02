import { readable, writable } from 'svelte/store';
import { version } from '../../package.json';

export const siteVersion = readable(version);
export const showReleaseNotes = writable(false);

function init() {
  const versionLastSeen = window.localStorage.getItem('versionLastSeen');
  if (version !== versionLastSeen) showReleaseNotes.set(true);
}

init();
