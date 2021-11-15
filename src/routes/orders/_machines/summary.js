import { getContext } from 'svelte';
import { createMachine, assign, spawn } from 'xstate';

import { log } from '$utils/error';
import createConfig from './summaryConfig';

function createServices(stepsMachine) {
	const { send } = getContext('cart');

	return {
		guards: {},
		services: {},

		actions: {
			logError: (context, event) =>
				log({
					error: 'summary state machine has ended in the error state.',
					extra: { context, event }
				}),

			notifyPrerequisitesMet: () => send('VERIFICATION_SUCCESS'),

			setStepsMachine: assign({
				stepsMachine: (_context) => spawn(stepsMachine)
			}),

			setPrerequisitesMet: assign({
				prerequisitesMet: () => true
			})
		}
	};
}

function create(stepsMachine) {
	const services = createServices(stepsMachine);
	return createMachine({ ...createConfig() }, { ...services });
}

export default create;
