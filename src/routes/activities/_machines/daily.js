import { createMachine, assign } from 'xstate';
import lodash from 'lodash';

import { log } from '$utils/error';
import createPagingConfig from '$machines/page';
import sessionsApi from '$dataSources/api.that.tech/sessions';

const { uniqBy } = lodash;
function createServices() {
	const { queryNextSessionsByDate } = sessionsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) => queryNextSessionsByDate({ cursor: context.cursor, pageSize: 100 })
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'daily activities state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'Daily Activities' }
				}),

			loadNextSuccess: assign({
				items: (context, { data }) =>
					uniqBy([...context.items, ...data.sessions.filter((s) => s)], (i) => i.id),
				events: (context, { data: { sessions } }) =>
					uniqBy(
						[...context.events, ...sessions.filter((s) => s).map((e) => e.event)],
						(i) => i.id
					),
				cursor: (_, { data }) => data.cursor
			})
		}
	};
}

function create({ items = [], cursor = undefined, events = [] }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor, events }) }, { ...services });
}

export default create;
