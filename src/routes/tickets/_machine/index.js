import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { createMachine, assign } from 'xstate';

import { log } from '$utils/error';
import config from './config';

function createServices() {
	return {
		guards: {
			enrollmentNotStarted: (context) => true,
			enrollmentInProgress: (context) => true,
			enrollmentHasCompleted: (context) => true
		},

		services: {},

		actions: {
			logError: (context, event) =>
				log({
					error: 'speaker accept state machine ended in the error state.',
					extra: { context, event }
				})
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...config(meta) }, { ...services });
}

export default create;
