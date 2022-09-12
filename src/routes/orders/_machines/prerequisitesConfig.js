function createConfig(metaContext) {
	return {
		id: 'PrerequisitesMachine',
		initial: 'pendingLogin',
		context: {
			meta: metaContext || undefined,
			isAuthenticated: false,
			hasUserProfile: false,
			prerequisitesMet: false
		},

		on: {
			/*
				AUTHENTICATED Event 
				send('AUTHENTICATED', {status: true})
			*/
			AUTHENTICATED: {
				actions: ['setIsAuthenticated'],
				target: 'pendingLogin'
			},

			/*
				PROFILE_COMPLETED Event 
				send('PROFILE_COMPLETED', {status: true})
			*/
			PROFILE_COMPLETED: {
				actions: ['setHasUserProfile']
			}
		},

		states: {
			pendingLogin: {
				always: [
					{
						cond: 'isAuthenticated',
						target: 'authenticated'
					},
					{
						target: 'unAuthenticated'
					}
				]
			},

			unAuthenticated: {},

			authenticated: {
				always: [
					{
						cond: 'hasUserProfile',
						target: 'profileCompleted'
					},
					{
						target: 'pendingProfile'
					}
				]
			},

			pendingProfile: {
				always: [
					{
						cond: 'hasUserProfile',
						target: 'profileCompleted'
					}
				]
			},

			profileCompleted: {
				entry: ['setPrerequisitesMet'],
				always: {
					target: 'prerequisitesMet'
				}
			},

			prerequisitesMet: {
				entry: ['notifyPrerequisitesWereMet']
			},

			error: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
