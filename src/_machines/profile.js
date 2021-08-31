/*
  FOLLOW Event
  send('FOLLOW', {id: 'communityId'})

  FOLLOWING Event
  send('FOLLOWING', {status: true})

  AUTH Event
  send('AUTHENTICATED', {status: true})
*/

function createConfig(slug) {
	return {
		id: 'profile',
		initial: 'validating',

		context: {
			slug: slug || undefined,
			profile: undefined,
			isFollowing: false,
			isAuthenticated: false,
			followMachineServices: undefined,
			activitiesMachineServices: undefined
		},

		on: {
			AUTHENTICATED: {
				actions: ['setIsAuthenticated']
			}
		},

		states: {
			validating: {
				always: [
					{
						cond: 'isValidSlug',
						target: 'loading'
					},
					{
						target: 'notFound'
					}
				]
			},
			loading: {
				invoke: {
					id: 'queryProfile',
					src: 'queryProfile',
					onDone: [
						{
							cond: 'profileFound',
							actions: [
								'queryProfileSuccess',
								'createFollowMachineServices',
								'createActivitiesMachineServices'
							],
							target: 'profileLoaded'
						},
						{
							cond: 'profileNotFound',
							target: 'notFound'
						}
					],
					onError: 'error'
				}
			},

			profileLoaded: {
				initial: 'unknown',

				on: {
					AUTHENTICATED: {
						actions: ['setIsAuthenticated'],
						target: '.unknown'
					}
				},

				states: {
					unknown: {
						always: [
							{
								cond: 'isAuthenticated',
								target: 'authenticated'
							},
							{
								cond: 'isUnAuthenticated',
								target: 'unAuthenticated'
							}
						]
					},

					authenticated: {
						initial: 'loadFollowing',

						on: {
							FOLLOW: '.toggleFollow'
						},

						states: {
							loadFollowing: {
								invoke: {
									id: 'queryMyFollowing',
									src: 'queryMyFollowing',
									onDone: [
										{
											meta: {
												message: 'load following api success.'
											},
											actions: ['queryMyFollowingSuccess'],
											target: 'loaded'
										}
									],

									onError: {
										meta: {
											message: 'toggle follow api errored.'
										},
										target: 'error'
									}
								}
							},

							toggleFollow: {
								invoke: {
									id: 'toggleFollow',
									src: 'toggleFollow',
									onDone: [
										{
											actions: ['toggeFollowSuccess', 'refreshFollowers'],
											target: 'loadFollowing'
										}
									],
									onError: {
										target: 'error'
									}
								}
							},

							loaded: {},

							error: {
								entry: 'logError',
								type: 'final'
							}
						}
					},
					unAuthenticated: {}
				}
			},

			notFound: {
				entry: 'notFound',
				type: 'final'
			},

			error: {
				entry: 'logError',
				type: 'final'
			}
		}
	};
}

export default createConfig;
