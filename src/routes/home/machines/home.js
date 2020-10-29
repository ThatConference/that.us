import { getClient } from '@urql/svelte';
import { Machine, assign, spawn } from 'xstate';

import createHomeConfig from './homeConfig';
import upNextServices from './upNext';

function createServices(client) {
  return {
    guards: {},
    services: {},

    actions: {
      logError: (context, event) => console.error({ context, event }),

      createActors: assign({
        upNextActor: context => spawn(upNextServices(context.meta, client)),
      }),
    },
  };
}

function create(meta, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...createHomeConfig(meta) }, { ...services });
}

export default create;
