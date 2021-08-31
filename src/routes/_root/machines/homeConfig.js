function createConfig(metaContext) {
	return {
		id: 'home',
		initial: 'init',

		context: {
			meta: metaContext || undefined,
			upNextActor: undefined,
			statsActor: undefined
		},

		states: {
			init: {
				always: {
					actions: ['createActors'],
					target: 'loaded'
				}
			},

			loaded: {},

			error: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
