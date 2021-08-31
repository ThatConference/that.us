import { assign, spawn, createMachine } from 'xstate';

import gFetch from '$utils/gFetch';
import { log } from '$utils/error';

import createHomeConfig from './homeConfig';
import upNextServices from './upNext';
import statsServices from './stats';

function createServices(client) {
	return {
		guards: {},
		services: {},

		actions: {
			logError: (context, event) =>
				log({
					error: 'home state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'home' }
				}),

			createActors: assign({
				upNextActor: (context) => spawn(upNextServices(context.meta, client)),
				statsActor: (context) => spawn(statsServices(context.meta, client))
			})
		}
	};
}

function create(meta, client = gFetch()) {
	const services = createServices(client);
	return createMachine({ ...createHomeConfig(meta) }, { ...services });
}

export default create;
