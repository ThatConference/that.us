import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import { log } from '../../../utilities/error';
import partnersApi from '../../../dataSources/api.that.tech/partner/queries';
import createPagingConfig from '../../../machines/paging';

function createServices() {
  const { getEventPartners, getNextEventPartners } = partnersApi(getClient());

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: () => getEventPartners(),
      loadNext: context => getNextEventPartners(context.cursor), // todo stubbed until we have paged partners
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'partners partners state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'partners' },
        }),

      loadSuccess: assign({
        items: (_, { data }) => data,
        cursor: (_, { data }) => undefined, // todo add once we have paged partners
      }),

      // todo... we add to the object
      loadNextSuccess: assign({
        items: (context, event) =>
          uniqBy([...context.items, ...event.data.members], i => i.id),
        cursor: (_, { data }) => data.cursor,
      }),

      loadedAllSuccess: () => {}, // stub action for now.
    },
  };
}

function create() {
  const services = createServices();

  return Machine({ ...createPagingConfig() }, { ...services });
}

export default create;
