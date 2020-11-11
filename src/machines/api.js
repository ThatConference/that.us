/*
  REFRESH Event -- will refresh from load vs load next
  send('REFRESH)
*/

function createConfig(metaContext) {
  return {
    id: 'apiMachine',
    initial: 'init',
    context: {
      meta: metaContext || undefined,
      results: undefined,
    },

    states: {
      init: {
        meta: {
          message: 'in initial state',
        },

        invoke: {
          id: 'initialLoad',
          meta: {
            message: 'calling load',
          },
          src: 'load',
          onDone: {
            meta: {
              message: 'loading item data success',
            },
            actions: ['loadSuccess'],
            target: 'loaded',
          },
          onError: 'loadingFailed',
        },
      },

      loaded: {
        meta: {
          message: 'item data loaded',
        },
        on: {
          REFRESH: {
            meta: {
              message: 'event REFRESH fired',
            },
            target: 'init',
          },
        },
      },

      loadingFailed: {
        meta: {
          message: 'loading has failed',
        },
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
