import { createMachine, assign, sendParent } from 'xstate';

import { log } from '$utils/error';
import createConfig from './stepsConfig';

function createServices() {
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

			notifyPrerequisitesWereMet: sendParent('PREREQUISITES_MET')
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...createConfig(meta) }, { ...services });
}

export default create;
