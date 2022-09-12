function createConfig(metaContext) {
	return {
		id: 'Cart',
		type: 'parallel',
		context: {
			meta: metaContext || undefined,
			eventId: undefined,
			eventDetails: undefined,
			cart: {},
			checkoutSessionId: undefined,
			productTypes: []
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

			cart: {
				initial: 'init',

				on: {
					ADD_ITEM: [
						{
							cond: 'isDuplicateMembership',
							target: '.cartError.duplicateMembership'
						},
						{
							cond: 'isTicketOrMemberhip',
							target: '.cartError.invalidProductType'
						},
						{
							cond: 'isSameEvent',
							target: '.cartError.invalidEvent'
						},
						{
							actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
							target: '.pending'
						}
					],
					CONTINUE: { target: '.init' },
					REPLACE_CART: {
						actions: ['clearCart', 'clearLocalStorage', 'addItem', 'setLocalStorage'],
						target: '.pending'
					}
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
							cond: 'hasCartItems',
							target: 'pending'
						}
					},

					pending: {
						always: {
							cond: 'isEmptyCart',
							actions: ['clearCart', 'clearLocalStorage'],
							target: 'new'
						},
						on: {
							UPDATE_QUANTITY: {
								actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
								target: 'pending'
							},

							REMOVE_ITEM: {
								actions: ['readLocalStorage', 'removeItem', 'setLocalStorage'],
								target: 'pending'
							},

							CLEAR_CART: {
								actions: ['clearCart', 'clearLocalStorage'],
								target: 'new'
							}
						}
					},

					error: {
						entry: 'logError',
						type: 'final'
					},

					cartError: {
						initial: 'error',
						states: {
							error: {},
							duplicateMembership: {
								entry: ['clearCart', 'clearLocalStorage', 'addItem', 'setLocalStorage'],
								always: {
									target: '#Cart.cart.pending'
								}
							},

							invalidEvent: {
								entry: 'saveAddErrorEventData'
							},

							invalidProductType: {
								entry: 'saveAddErrorEventData'
							}
						}
					}
				}
			}
		}
	};
}

export default createConfig;
