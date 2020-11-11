import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '../../../utilities/error';

import apiConfig from '../../../machines/api';
import statsApi from '../../../dataSources/api.that.tech/stats/queries';

function createServices(client) {
  const { queryCommunityStats } = statsApi(client);

  return {
    guards: {},

    services: {
      load: () => queryCommunityStats(),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'home stats state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'stats' },
        }),

      loadSuccess: assign({
        results: (_, { data }) => data,
      }),
    },
  };
}

function create(meta, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...apiConfig(meta) }, { ...services });
}

export default create;
