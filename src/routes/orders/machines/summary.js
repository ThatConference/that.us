import { getContext } from 'svelte';
import { Machine, assign, spawn } from 'xstate';

import { log } from '../../../utilities/error';
import createConfig from './summaryConfig';

function createServices(stepsMachine) {
  const { send } = getContext('cart');

  return {
    guards: {},
    services: {},

    actions: {
      logError: (context, event) =>
        log({
          error: 'summary state machine has ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'summary' },
        }),

      notifyPrerequisitesMet: () => send('VERIFICATION_SUCCESS'),

      setStepsMachine: assign({
        stepsMachine: context => spawn(stepsMachine),
      }),

      setPrerequisitesMet: assign({
        prerequisitesMet: () => true,
      }),
    },
  };
}

function create(stepsMachine) {
  const services = createServices(stepsMachine);
  return Machine({ ...createConfig() }, { ...services });
}

export default create;
