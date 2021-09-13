import { browser } from '$app/env';
import { createMachine, assign } from 'xstate';
import lodash from 'lodash';

import { log } from '../error';
import createConfig from './cartConfig';

const { isEmpty } = lodash;
const cartKeyName = 'cart';
const cartVersion = '1.0.0';

function createServices() {
	return {
		guards: {
			hasCartItems: (context) => !isEmpty(context.cart),

			isEmptyCart: (context) => isEmpty(context.cart),

			isDuplicateMembership: (context, event) => {
				// triggers just replacing the item in the cart.

				if (isEmpty(context.cart)) return false;

				if (event.productType !== 'MEMBERSHIP') {
					return false;
				}

				if (event.productType === 'MEMBERSHIP' && context.productTypes.includes('MEMBERSHIP')) {
					return true;
				}

				return false;
			},

			isTicketOrMemberhip: (context, event) => {
				// triggers just replacing the item in the cart.
				if (isEmpty(context.cart)) return false;

				if (event.productType === 'MEMBERSHIP' && !context.productTypes.includes('MEMBERSHIP'))
					return true;

				if (event.productType !== 'MEMBERSHIP' && context.productTypes.includes('MEMBERSHIP'))
					return true;

				// cannot have a membership mixed with tickets.
				return false;
			},

			isSameEvent: (context, event) => {
				if (isEmpty(context.cart)) return false;

				return context.eventId !== event.eventId;
			}
		},

		services: {},

		actions: {
			logError: (context, event) =>
				log({
					error: 'cart state machine has ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'cart' }
				}),

			saveAddErrorEventData: assign({
				addErrorEventData: (_, event) => event
			}),

			readLocalStorage: assign(() => {
				const localCart = browser ? window.localStorage.getItem(cartKeyName) : null;
				const results = JSON.parse(localCart) || {};

				const { lineItems = {}, eventId = undefined, productTypes = [] } = results;

				return {
					eventId,
					cart: lineItems,
					productTypes
				};
			}),

			setLocalStorage: (context) => {
				const { cart, eventId, productTypes } = context;

				const localCart = {
					version: cartVersion,
					lineItems: cart,
					eventId,
					productTypes
				};

				window.localStorage.setItem(cartKeyName, JSON.stringify(localCart));
			},

			clearCart: assign({
				cart: () => ({}),
				eventId: () => undefined,
				productTypes: () => []
			}),

			clearLocalStorage: () => window.localStorage.removeItem(cartKeyName),

			addItem: assign({
				eventId: (context, event) => context.eventId || event.eventId,
				productTypes: (context, event) => [...context.productTypes, event.productType],
				cart: (context, event) => {
					if (!event.id) {
						throw new Error('No id passed into addItem');
					}

					const { id, quantity = 1, price, name, description, productType } = event;

					const currentCart = context.cart;

					if (currentCart[id]) {
						currentCart[id] = {
							qty: event.quantity ? event.quantity : currentCart[id].qty + quantity
						};
					} else {
						currentCart[id] = {
							qty: quantity
						};
					}

					currentCart[id] = {
						...currentCart[id],
						id,
						name,
						description,
						productType,
						price,
						isBulkPurchase: currentCart[id].qty > 1
					};

					return currentCart;
				}
			}),

			removeItem: assign({
				cart: (context, event) => {
					if (!event.id) {
						throw new Error('No id passed into removeItem');
					}

					const { id } = event;
					const currentCart = context.cart;

					delete currentCart[id];

					return currentCart;
				}
			})
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...createConfig(meta) }, { ...services });
}

export default create;
