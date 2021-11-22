import { createMachine, assign } from 'xstate';

import lodash from 'lodash';

import { log } from '$utils/error';
import createPagingConfig from '$machines/page';

//TODO: speakers
import membersApi from '$dataSources/api.that.tech/members/queries';

const { uniqBy } = lodash;

function createServices() {
	const { queryMembers, queryMembersNext } = membersApi();

	let queryFirst = true;

	return {
		guards: {
			hasMore: (_, { data }) => (queryFirst || data.cursor !== null)
		},

		services: {
			loadNext: (context) => {
				console.log('LOAD NEXT');
				if (queryFirst) {
					console.log('query first')
					queryFirst = false;
					return queryMembers();
				}
				else {
					console.log('query next')
					return queryMembersNext(context.cursor) //TODO: querySpeakersNext()
				}
			}
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'members members state machine ended in the error state.',
					extra: { context, event }
				}),

			loadNextSuccess: assign({
				items: (context, event) => uniqBy([...context.items, ...event.data.members], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: () => { } // stub action for now.
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor }) }, { ...services });
}

export default create;
