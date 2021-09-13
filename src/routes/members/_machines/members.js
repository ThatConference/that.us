import { createMachine, assign } from 'xstate';

import lodash from 'lodash';

import { log } from '$utils/error';
import createPagingConfig from '$machines/page';
import membersApi from '$dataSources/api.that.tech/members/queries';

const { uniqBy } = lodash;

function createServices() {
	const { queryMembersNext } = membersApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) => queryMembersNext(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'members members state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'members' }
				}),

			loadNextSuccess: assign({
				items: (context, event) => uniqBy([...context.items, ...event.data.members], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: () => {} // stub action for now.
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor }) }, { ...services });
}

export default create;
