/*
  NEXT Event -- will get the next page of data
  send('NEXT')

  REFRESH Event -- will refresh from load vs load next
  send('REFRESH)
*/

function getMachine() {
  return {
    id: 'pagingMachine',
    initial: 'init',
    context: {
      items: [],
      cursor: null,
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

      loadingNext: {
        invoke: {
          id: 'loadingNext',
          meta: {
            message: 'calling load next',
          },
          src: 'loadNext',
          onDone: [
            {
              meta: {
                message: 'loading item next data was a success',
              },
              cond: 'hasMore',
              actions: ['loadNextSuccess'],
              target: 'loaded',
            },
            {
              target: 'loadedAll',
            },
          ],
          onError: 'loadingFailed',
        },
      },

      loaded: {
        meta: {
          message: 'item data loaded',
        },
        on: {
          NEXT: {
            meta: {
              message: 'event NEXT fired',
            },
            target: 'loadingNext',
          },

          REFRESH: {
            meta: {
              message: 'event REFRESH fired',
            },
            target: 'init',
          },
        },
      },

      loadedAll: {
        meta: {
          message: 'all possible data has been loaded',
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

export default getMachine();
