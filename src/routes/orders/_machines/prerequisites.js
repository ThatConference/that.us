import { createMachine, assign } from 'xstate';
import { getContext } from 'svelte';
import { log } from '$utils/error';

import createConfig from './prerequisitesConfig';

function createServices() {
	const { send } = getContext('cart');
	const { send: claimTicketSend } = getContext('claimTicket');

	return {
		guards: {
			isAuthenticated: (context) => context.isAuthenticated,
			hasUserProfile: (context) => context.hasUserProfile
		},

		services: {},

		actions: {
			logError: (context, event) =>
				log({
					error: 'summary state machine has ended in the error state.',
					extra: { context, event }
				}),

			setIsAuthenticated: assign({
				isAuthenticated: (_, event) => event.status
			}),

			setHasUserProfile: assign({
				hasUserProfile: (_, event) => event.status
			}),

			setPrerequisitesMet: assign({
				prerequisitesMet: () => true
			}),

			notifyPrerequisitesWereMet: () => {
				send('VERIFICATION_SUCCESS');
				claimTicketSend('VERIFICATION_SUCCESS');
			}
		}
	};
}

function create(meta = undefined) {
	const services = createServices();
	return createMachine({ ...createConfig(meta) }, { ...services });
}

export default create;
