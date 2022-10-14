import gFetch from '$utils/gfetch';
import * as Sentry from '@sentry/svelte';

import { log } from '../utilities/error';

const mutations = {
	MUTATION_SPEAKER_ACCEPT_INVITATION: `
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
	`,
	MUTATION_ORDER_SPEAKER_PRODUCTS: `
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
	`,

	MUTATION_ORDER_ALLOCATION_RESPONSES: `
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
	`,

	MUTATION_ACCEPT_ROOM_COMPENSATION: `
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
	`,

	MUTATION_COMPLETE_SPEAKER_ENROLLMENT: `
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
	`
};

function logResult(results, mutation) {
	if (!results.success) {
		Sentry.withScope((scope) => {
			scope.setLevel('error');
			Sentry.captureException(new Error(results.message), {
				tags: {
					api_that_tech: mutation,
					feature: 'speaker-accept'
				}
			});
		});
	}
}

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function acceptInvitation({ eventSlug, agreeToSpeak, reason = undefined }) {
		const variables = { eventSlug, agreeToSpeak, reason };
		const mutation = 'MUTATION_SPEAKER_ACCEPT_INVITATION';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: mutation });

				const results = data.events?.me?.speaker?.acceptToSpeak;
				logResult(results, mutation);

				return results;
			});
	}

	function declineInvitation({ eventSlug, agreeToSpeak, reason = undefined }) {
		const variables = { eventSlug, agreeToSpeak, reason };
		const mutation = 'MUTATION_SPEAKER_ACCEPT_INVITATION';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: mutation });

				const results = data.events?.me?.speaker?.acceptToSpeak;
				logResult(results, mutation);

				return results;
			})
			.then(() => completeSpeakerEnrollment({ eventSlug }));
	}

	function orderProducts({ eventSlug, products }) {
		const variables = { eventSlug, products };
		const mutation = 'MUTATION_ORDER_SPEAKER_PRODUCTS';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: mutation });

				const results = data.orders?.me?.orderSpeakerProducts;
				logResult(results, mutation);

				return results;
			});
	}

	function addOrderAllocationResponses({ orderId, allocationId, responses }) {
		const variables = { orderId, allocationId, responses };
		const mutation = 'MUTATION_ORDER_ALLOCATION_RESPONSES';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: mutation });

				const results = data.orders?.me?.order?.orderAllocation?.saveQuestionResponses;
				logResult(results, mutation);

				return results;
			});
	}

	function acceptRoomCompensation({ eventSlug, declinedRoomComp }) {
		const variables = { eventSlug, hasAccepted: !declinedRoomComp };
		const mutation = 'MUTATION_ACCEPT_ROOM_COMPENSATION';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: mutation });

				const results = data.events?.me?.speaker?.acceptRoomBenefit;
				logResult(results, mutation);

				return results;
			});
	}

	function completeSpeakerEnrollment({ eventSlug }) {
		const variables = { eventSlug };
		const mutation = 'MUTATION_COMPLETE_SPEAKER_ENROLLMENT';

		return client
			.mutation({ mutation: mutations[mutation], variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tags: mutation });

				const results = data.events?.me?.speaker?.completeEnrollment;
				logResult(results, mutation);

				return results;
			});
	}

	return {
		declineInvitation,
		acceptInvitation,
		orderProducts,
		addOrderAllocationResponses,
		acceptRoomCompensation,
		completeSpeakerEnrollment
	};
};
