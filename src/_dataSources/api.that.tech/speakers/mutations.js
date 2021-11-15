import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

export const MUTATION_SPEAKER_ACCEPT_INVITATION = `
	mutation MUTATION_SPEAKER_ACCEPT_INVITATION ($eventSlug: String, $agreeToSpeak: Boolean!, $reason: String) {
		events {
			me(findBy: {slug: $eventSlug}) {
				speaker {
					acceptToSpeak (agreeToSpeak: $agreeToSpeak, reason: $reason) {
						success
						message
					}
				}
			}
		}
	}
`;

export const MUTATION_ORDER_SPEAKER_PRODUCTS = `
	mutation MUTATION_ORDER_SPEAKER_PRODUCTS ($eventSlug: String, $products: [UiProductReference!]!) {
		orders {
			me {
				orderSpeakerProducts (findEventBy: {slug: $eventSlug}, products: $products) {
					success
					message
				}
			}
		}
	}
`;

export const MUTATION_ORDER_ALLOCATION_RESPONSES = `
	mutation MUTATION_ORDER_ALLOCATION_RESPONSES ($orderId: ID!, $allocationId: ID!, $responses: AllocationQuestionResponseInput!) {
		orders {
			me {
				order (orderId: $orderId) {
					orderAllocation (orderAllocationId: $allocationId) {
						saveQuestionResponses (responses: $responses) {
							success
							message
						}
					}
				}
			}
		}
	}
`;

export const MUTATION_ACCEPT_ROOM_COMPENSATION = `
	mutation MUTATION_ACCEPT_ROOM_COMPENSATION ($eventSlug: String, $hasAccepted: Boolean!) {
		events {
			me (findBy: {slug: $eventSlug}) {
				speaker {
					acceptRoomBenefit (accept: $hasAccepted) {
						success
						message
					}
				}
			}
		}
	}
`;

export const MUTATION_COMPLETE_SPEAKER_ENROLLMENT = `
	mutation MUTATION_COMPLETE_SPEAKER_ENROLLMENT ($eventSlug: String) {
		events {
			me (findBy: {slug: $eventSlug}) {
				speaker {
					completeEnrollment {
						success
						message
					}
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function acceptInvitation({ eventSlug, agreeToSpeak, reason = undefined }) {
		const variables = { eventSlug, agreeToSpeak, reason };

		return client
			.mutation({ mutation: MUTATION_SPEAKER_ACCEPT_INVITATION, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_SPEAKER_ACCEPT_INVITATION' });
				return data.events?.me?.speaker?.acceptToSpeak;
			});
	}

	function orderProducts({ eventSlug, products }) {
		const variables = { eventSlug, products };

		return client
			.mutation({ mutation: MUTATION_ORDER_SPEAKER_PRODUCTS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: 'MUTATION_ORDER_SPEAKER_PRODUCTS' });

				console.log({ data });

				return data.orders?.me?.orderSpeakerProducts;
			});
	}

	function addOrderAllocationResponses({ orderId, allocationId, responses }) {
		const variables = { orderId, allocationId, responses };

		return client
			.mutation({ mutation: MUTATION_ORDER_ALLOCATION_RESPONSES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: 'MUTATION_ORDER_ALLOCATION_RESPONSES' });
				return data.orders?.me?.order?.orderAllocation?.saveQuestionResponses;
			});
	}

	function acceptRoomCompensation({ eventSlug, declinedRoomComp }) {
		const variables = { eventSlug, hasAccepted: !declinedRoomComp };

		return client
			.mutation({ mutation: MUTATION_ACCEPT_ROOM_COMPENSATION, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: 'MUTATION_ACCEPT_ROOM_COMPENSATION' });
				return data.events?.me?.speaker?.acceptRoomBenefit;
			});
	}

	function completeSpeakerEnrollment({ eventSlug }) {
		const variables = { eventSlug };

		return client
			.mutation({ mutation: MUTATION_COMPLETE_SPEAKER_ENROLLMENT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: 'MUTATION_COMPLETE_SPEAKER_ENROLLMENT' });
				return data.events?.me?.speaker?.completeEnrollment;
			});
	}

	return {
		acceptInvitation,
		orderProducts,
		addOrderAllocationResponses,
		acceptRoomCompensation,
		completeSpeakerEnrollment
	};
};
