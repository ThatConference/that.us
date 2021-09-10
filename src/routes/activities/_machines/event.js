import { createMachine, assign } from 'xstate';
import lodash from 'lodash';

import { log } from '$utils/error';

import createPagingConfig from '$machines/page';
import sessionsApi from '$dataSources/api.that.tech/sessions';

const { uniqBy } = lodash;

function createServices() {
	const { querySessionsBySlug } = sessionsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) =>
				querySessionsBySlug({
					slug: context.eventSlug,
					cursor: context.cursor
				})
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'events activities state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'Events Activities' }
				}),

			loadNextSuccess: assign({
				items: (context, { data: { sessions } }) =>
					uniqBy([...context.items, ...sessions.sessions.filter((s) => s)], (i) => i.id),
				cursor: (_, { data: { sessions } }) => sessions.cursor
			})
		}
	};
}

function create({ items = [], cursor = undefined, eventSlug }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor, eventSlug }) }, { ...services });
}

export default create;
