function createConfig(metaContext) {
  return {
    id: 'home',
    initial: 'init',

    context: {
      meta: metaContext || undefined,
      upNextActor: undefined,
    },

    states: {
      init: {
        meta: {
          message: 'loading community data',
        },
        on: {
          '': {
            actions: ['createActors'],
            target: 'loaded',
          },
        },
      },

      loaded: {
        meta: {
          message: 'loading community data',
        },
      },

      error: {
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
