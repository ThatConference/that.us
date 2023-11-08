import { browser } from '$app/environment';
import { goto } from '$app/navigation';

import { createMachine, assign } from 'xstate';

import orderMutationApi from '$dataSources/api.that.tech/orders/mutations';

import { log } from '../error';
import createConfig from './config';

const claimCartKeyName = 'claimCart';
const claimCartVersion = '1.0.0';

function createServices() {
	const { claimTicket } = orderMutationApi();
	const TICKET_TYPE = {
		EXPO_HALL: 'expoHall',
		OTHER: 'other'
	};

	return {
		guards: {
			isPendingClaim: (context) => context.pendingClaim,
			wasTicketClaimed: (_, { data }) => data.result,
			isExpoHallTicket: (context) => context?.ticketType === TICKET_TYPE.EXPO_HALL
		},

		services: {
			claimTicket: (context) => claimTicket(context.eventId, context.productId)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'cart state machine has ended in the error state.',
					extra: { context, event }
				}),

			saveAddErrorEventData: assign({
				addErrorEventData: (_, event) => event
			}),

			readLocalStorage: assign(() => {
				const localCart = browser ? window.localStorage.getItem(claimCartKeyName) : null;
				const results = JSON.parse(localCart) || {};

				const {
					eventId = undefined,
					productId = undefined,
					eventDetails = undefined,
					productDetails = undefined
				} = results;
				return {
					eventId,
					eventDetails,
					productId,
					productDetails,
					pendingClaim: eventId && productId ? true : false
				};
			}),

			setLocalStorage: (context) => {
				const { eventId, productId, eventDetails, productDetails } = context;

				const localCart = {
					version: claimCartVersion,
					eventId,
					eventDetails,
					productId,
					productDetails
				};

				window.localStorage.setItem(claimCartKeyName, JSON.stringify(localCart));
			},

			clearCart: assign({
				pendingClaim: () => false,
				eventId: () => undefined,
				eventDetails: () => undefined,
				productId: () => undefined,
				productDetails: () => undefined
			}),

			clearLocalStorage: () => window.localStorage.removeItem(claimCartKeyName),

			addItem: assign({
				pendingClaim: () => true,
				eventDetails: (context, event) =>
					event.eventDetails
						? {
								logo: event.eventDetails.logo,
								name: event.eventDetails.name,
								slug: event.eventDetails.slug,
								type: event.eventDetails.type
						  }
						: context.eventDetails,
				eventId: (context, event) => context.eventId || event.eventId,
				productId: (context, event) => context.productId || event.productId,
				productDetails: (context, event) =>
					event.productDetails
						? {
								name: event.productDetails.name,
								eventActivities: event.productDetails.eventActivities,
								uiReference: event.productDetails.uiReference
						  }
						: context.productDetails
			}),

			claimTicketSuccess: assign({
				claimResults: (_, { data }) => data.results,
				ticketType: ({ productDetails }) => {
					let ticketType = TICKET_TYPE.OTHER;
					if (productDetails?.eventActivities?.includes('EXPO_HALL')) {
						ticketType = TICKET_TYPE.EXPO_HALL;
					}
					return ticketType;
				}
			}),

			defaultRedirect: () => goto('/orders/success/claim-ticket/'),
			expoHallRedirect: () => goto('/orders/success/expo-hall-ticket')
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...createConfig(meta) }, { ...services });
}

export default create;
