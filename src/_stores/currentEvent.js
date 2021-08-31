import { writable } from 'svelte/store';
import config from '$utils/config';

export default writable({ eventId: config.eventId, title: 'THAT' });
