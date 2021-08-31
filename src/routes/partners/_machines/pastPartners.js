import { createMachine, assign } from 'xstate';
import { uniqBy, sortBy } from 'lodash';

import gFetch from '$utilities/gFetch';
import { log } from '$utils/error';
import partnersApi from '$dataSources/api.that.tech/partner/queries';
import createPagingConfig from '$machines/paging';

function createServices() {
	const { getPastPartners, getPastPartnersNext } = partnersApi(gFetch());

	return {
		guards: {
			hasMore: (_, event) => event.data.length > 0
		},

		services: {
			load: (context) => getPastPartners(),
			loadNext: (context) => getPastPartnersNext(context.cursor) // todo stubbed until we have paged partners
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'partners partners state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'partners' }
				}),

			loadSuccess: assign({
				items: (_, { data }) => sortBy(data, 'companyName'),
				cursor: () => undefined // todo add once we have paged partners
			}),

			// todo... we add to the object
			loadNextSuccess: assign({
				items: (context, event) => uniqBy([...context.items, ...event.data], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: () => {} // stub action for now.
		}
	};
}

function create() {
	const services = createServices();

	return createMachine({ ...createPagingConfig() }, { ...services });
}

export default create;
