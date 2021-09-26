/*
  AUTHENTICATED Event 
  send('AUTHENTICATED', {status: true})
  
  PROFILE_COMPLETED Event 
  send('PROFILE_COMPLETED', {status: true})
*/

function createConfig(metaContext) {
	return {
		id: 'Order_Summary_Steps',
		initial: 'pendingLogin',
		context: {
			meta: metaContext || undefined,
			isAuthenticated: false,
			hasUserProfile: false
		},

		on: {
			AUTHENTICATED: {
				actions: ['setIsAuthenticated'],
				target: 'pendingLogin'
			},

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
					}
				]
			},

			authenticated: {
				initial: 'pendingProfile',
				states: {
					pendingProfile: {
						always: {
							cond: 'hasUserProfile',
							target: 'profileCompleted'
						}
					},

					profileCompleted: {
						initial: 'pendingVerification',
						states: {
							pendingVerification: {
								entry: ['notifyPrerequisitesWereMet'],
								on: {
									complete: {
										target: 'completePurchase'
									}
								}
							},

							completePurchase: {
								type: 'final'
							}
						}
					}
				}
			},

			unAuthenticated: {},

			error: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
