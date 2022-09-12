function createConfig(metaContext) {
	return {
		id: 'ClaimTicket',
		type: 'parallel',
		context: {
			meta: metaContext || undefined,
			eventId: undefined,
			productId: undefined,
			pendingClaim: false,
			claimResults: undefined
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
									actions: ['claimTicketSuccess', 'clearCart', 'clearLocalStorage'],
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
						entry: 'redirectToSuccess'
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
