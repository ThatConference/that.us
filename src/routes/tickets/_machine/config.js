function create(meta) {
	return {
		id: 'ticket_enrollment_machine',
		initial: 'init',
		context: {
			completed: {
				one: false
			},

			...meta
		},

		states: {
			init: {
				always: []
			},

			submit_failed: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default create;
