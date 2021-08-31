import { createMachine, assign } from 'xstate';
import { uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { log } from '$utils/error';
import createPagingConfig from '$machines/paging';
import sessionsApi from '$dataSources/api.that.tech/sessions';

function createServices() {
	const { querySessionsBySlug } = sessionsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.count !== 0
		},

		services: {
			load: (context) => querySessionsBySlug({ slug: context.eventSlug }),
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

			// todo: will need to add the correct data structure once we have paged communities
			loadSuccess: assign({
				eventId: (_, { data }) => data.id,
				name: (_, { data }) => data.name,
				hasEnded: (_, { data }) => dayjs(data.endDate).isBefore(dayjs(), 'day'),
				items: (_, { data: { sessions } }) => sessions.sessions.filter((s) => s),
				cursor: (_, { data: { sessions } }) => sessions.cursor,
				count: (_, { data: { sessions } }) => sessions.count
			}),

			loadNextSuccess: assign({
				items: (context, { data: { sessions } }) =>
					uniqBy([...context.items, ...sessions.sessions.filter((s) => s)], (i) => i.id),
				cursor: (_, { data: { sessions } }) => sessions.cursor,
				count: (_, { data: { sessions } }) => sessions.count
			})
		}
	};
}

function create(eventSlug) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ eventSlug, hasEnded: true }) }, { ...services });
}

export default create;
