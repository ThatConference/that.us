function createConfig(eventId) {
	return {
		id: 'Pricing_Parent',
		initial: 'loading',
		context: {
			eventId,
			eventTicket: null,
			membership: null,
			cartMachine: null
		},

		states: {
			loading: {
				invoke: {
					id: 'loadProducts',
					src: 'queryProducts',
					onDone: {
						actions: ['queryProductsSuccess'],
						target: 'ready'
					},
					onError: 'error'
				}
			},

			ready: {},
			error: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
