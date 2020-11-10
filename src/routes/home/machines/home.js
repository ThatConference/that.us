import { getClient } from '@urql/svelte';
import { Machine, assign, spawn } from 'xstate';

import { log } from '../../../utilities/error';
import createHomeConfig from './homeConfig';
import upNextServices from './upNext';

function createServices(client) {
  return {
    guards: {},
    services: {},

    actions: {
      logError: context =>
        log({
          error: 'home state machine ended in the error state.',
          meta: context,
          tags: { stateMachine: 'home' },
        }),

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
