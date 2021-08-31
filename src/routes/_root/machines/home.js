import { assign, spawn, createMachine } from 'xstate';

import { log } from '$utils/error';

import createHomeConfig from './homeConfig';
import upNextServices from './upNext';
import statsServices from './stats';

function createServices() {
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
				upNextActor: (context) => spawn(upNextServices(context.meta)),
				statsActor: (context) => spawn(statsServices(context.meta))
			})
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...createHomeConfig(meta) }, { ...services });
}

export default create;
