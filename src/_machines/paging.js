/*
  NEXT Event -- will get the next page of data
  send('NEXT')

  REFRESH Event -- will refresh from load vs load next
  send('REFRESH)
*/

function createConfig(metaContext) {
	return {
		id: 'pagingMachine',
		initial: 'init',
		context: {
			...metaContext,
			meta: metaContext || undefined,
			items: [],
			cursor: null,
			count: 0
		},

		states: {
			init: {
				meta: {
					message: 'in initial state'
				},
				invoke: {
					id: 'initialLoad',
					src: 'load',
					onDone: {
						actions: ['loadSuccess'],
						target: 'loaded'
					},
					onError: 'loadingFailed'
				}
			},

			loadingNext: {
				invoke: {
					id: 'loadingNext',

					src: 'loadNext',
					onDone: [
						{
							cond: 'hasMore',
							actions: ['loadNextSuccess'],
							target: 'loaded'
						},
						{
							actions: ['loadedAllSuccess'],
							target: 'loadedAll'
						}
					],
					onError: 'loadingFailed'
				}
			},

			loaded: {
				on: {
					NEXT: {
						target: 'loadingNext'
					},

					REFRESH: {
						target: 'init'
					}
				}
			},

			loadedAll: {
				on: {
					REFRESH: {
						target: 'init'
					}
				}
			},

			loadingFailed: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
