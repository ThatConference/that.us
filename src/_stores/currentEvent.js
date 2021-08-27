import { writable } from 'svelte/store';
import config from '../_utils/config';

export default writable({ eventId: config.eventId, title: 'THAT' });
