/*
  AUTHENTICATED Event 
  send('AUTHENTICATED', {status: true})
  
  PROFILE_COMPLETED Event 
  send('PROFILE_COMPLETED', {status: true})
*/

function createConfig() {
  return {
    id: 'Order_Summary',
    initial: 'init',
    context: {
      prerequisitesMet: false,
      stepsMachine: null,
    },

    on: {
      PREREQUISITES_MET: {
        actions: ['setPrerequisitesMet'],
        target: 'ready',
      },
    },

    states: {
      init: {
        on: {
          '': {
            actions: ['setStepsMachine'],
            target: 'waiting',
          },
        },
      },
      waiting: {},
      ready: {
        entry: 'notifyPrerequisitesMet',
      },

      error: {
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
