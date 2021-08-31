import { assign, createMachine } from 'xstate';

import { log } from '$utils/error';

import apiConfig from '$machines/api';
import statsApi from '$dataSources/api.that.tech/stats/queries';

function createServices() {
	const { queryCommunityStats } = statsApi();

	return {
		guards: {},

		services: {
			load: () => queryCommunityStats()
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'home stats state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'stats' }
				}),

			loadSuccess: assign({
				results: (_, { data }) => data
			})
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...apiConfig(meta) }, { ...services });
}

export default create;
