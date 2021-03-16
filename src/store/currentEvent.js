import { writable } from 'svelte/store';
import config from '../config';

export default writable({ eventId: config.eventId, title: 'THAT' });
