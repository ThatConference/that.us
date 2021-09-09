/*
  NEXT Event -- will get the next page of data
  send('NEXT')

  REFRESH Event -- will refresh from load vs load next
  send('REFRESH)
*/

function create({ items = [], cursor = undefined }) {
	return {
		id: 'pagingMachine',
		initial: 'loaded',
		context: {
			items,
			cursor
		},

		states: {
			loaded: {
				on: {
					NEXT: {
						target: 'loadingNext'
					}

					// REFRESH: {
					// 	target: 'init'
					// }
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

			loadedAll: {
				on: {
					// REFRESH: {
					// 	target: 'init'
					// }
				}
			},

			loadingFailed: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default create;
