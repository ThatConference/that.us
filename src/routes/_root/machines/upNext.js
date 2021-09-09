import { assign, createMachine } from 'xstate';

import { log } from '$utils/error';
import createConfig from '$machines/page';
import sessionsApi from '$dataSources/api.that.tech/sessions';

function createServices() {
	const { queryNextSessionsByDate } = sessionsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) =>
				queryNextSessionsByDate({
					cursor: context.cursor,
					pageSize: 6
				})
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'home upnext state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'upnext' }
				}),

			loadNextSuccess: assign({
				items: (context, { data }) => data.sessions.filter((s) => s),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: assign({
				items: () => [],
				cursor: () => undefined
			})
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createConfig({ items, cursor }) }, { ...services });
}

export default create;
