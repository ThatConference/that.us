import { writable } from 'svelte/store';
import config from '$utils/config.public';

export default writable({ eventId: config.eventId, title: 'THAT' });
