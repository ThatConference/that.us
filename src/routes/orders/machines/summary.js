import { Machine, assign, send, spawn } from 'xstate';

import { log } from '../../../utilities/error';
import createConfig from './summaryConfig';

function createServices(stepsMachine, cartMachine) {
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

      notifyPrerequisitesMet: send('VERIFICATION_SUCCESS', {
        to: context => context.cartMachine,
      }),

      setCartMachine: assign({
        cartMachine: context => spawn(cartMachine),
      }),

      setStepsMachine: assign({
        stepsMachine: context => spawn(stepsMachine),
      }),

      setPrerequisitesMet: assign({
        prerequisitesMet: () => true,
      }),
    },
  };
}

function create(stepsMachine, cartMachine) {
  const services = createServices(stepsMachine, cartMachine);
  return Machine({ ...createConfig() }, { ...services });
}

export default create;
