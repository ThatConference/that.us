function createConfig(metaContext) {
	return {
		id: 'ClaimTicket',
		type: 'parallel',
		context: {
			meta: metaContext || undefined,
			eventId: undefined,
			productId: undefined,
			pendingClaim: false,
			claimResults: undefined,
			ticketType: undefined
		},
		states: {
			verification: {
				initial: 'unVerified',

				on: {
					VERIFICATION_SUCCESS: '.verified'
				},

				states: {
					unVerified: {},
					verified: {}
				}
			},

			claim: {
				initial: 'init',

				on: {
					ADD_ITEM: [
						{
							actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
							target: '.pending'
						}
					],

					CONTINUE: { target: '.init' }
				},

				states: {
					init: {
						always: {
							actions: ['readLocalStorage'],
							target: 'new'
						}
					},

					new: {
						always: {
							cond: 'isPendingClaim',
							target: 'pending'
						}
					},

					pending: {
						on: {
							CLEAR_CLAIM: {
								actions: ['clearCart', 'clearLocalStorage'],
								target: 'new'
							},

							CLAIM_TICKET: {
								target: 'claimingTicket'
							}
						}
					},

					claimingTicket: {
						invoke: {
							src: 'claimTicket',
							onDone: [
								{
									cond: 'wasTicketClaimed',
									actions: ['claimTicketSuccess'],
									target: 'ticketClaimed'
								},
								{
									target: 'ticketClaimIssue'
								}
							],
							onError: 'error'
						}
					},

					ticketClaimed: {
						entry: ['clearCart', 'clearLocalStorage'],
						initial: 'initial',
						states: {
							initial: {
								always: [
									{
										cond: 'isExpoHallTicket',
										target: 'expoHall'
									},
									{
										target: 'defaultRedirect'
									}
								]
							},
							expoHall: {
								entry: 'expoHallRedirect'
							},
							defaultRedirect: {
								entry: 'defaultRedirect'
							}
						}
					},

					ticketClaimIssue: {},
					error: {
						entry: 'logError',
						type: 'final'
					}
				}
			}
		}
	};
}

export default createConfig;
