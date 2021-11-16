import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

const enumValues = `
	options: enumValues {
		label: description
		value: name
	}
`;

export const QUERY_SPEAKER_DROPDOWN_VALUES = `
	query QUERY_SPEAKER_DROPDOWN_VALUES {
		tShirtSizes: __type(name: "TShirtSize") {
			${enumValues}
		}

		hoodieSizes: __type(name: "HoodieSize") {
			${enumValues}
		}
		
		dietaryRequirements: __type(name: "DietaryRequirement") {
			${enumValues}
		}
	}
`;

export const QUERY_MY_ACCEPTED_SPEAKER = `
	query QUERY_MY_ACCEPTED_SPEAKER($eventSlug: String) {
		events {
			me {
				acceptedSpeaker(findBy: {slug: $eventSlug}) {
					isAcceptedSpeaker
					agreeToSpeak
					status
					platform
					eventId
					isAcceptedSpeaker
					sessions {
						title
						shortDescription
						startTime
					}
				}
			}
		}
	}
`;

export const QUERY_MY_ORDERS = `
	query QUERY_MY_ORDERS($eventSlug: String, $orderType: OrderType ) {
		events {
			me {
				orders(findBy: {slug: $eventSlug}, orderType: $orderType) {
					id
					status
					orderAllocations {
						id
						isAllocated
						product {
							... on ProductBase {
								name
								shortDescription
								uiReference
							}
						}
					}
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function querySpeakerAcceptDownValues() {
		const variables = {};

		return client
			.query({ query: QUERY_SPEAKER_DROPDOWN_VALUES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_SPEAKER_DROPDOWN_VALUES' });

				return data;
			});
	}

	function queryMyAcceptedSpeaker(eventSlug) {
		const variables = { eventSlug };

		return client
			.secureQuery({ query: QUERY_MY_ACCEPTED_SPEAKER, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_MY_ACCEPTED_SPEAKER' });
				return data?.events?.me?.acceptedSpeaker;
			});
	}

	function queryMyOrders({ eventSlug, orderType = 'SPEAKER' }) {
		const variables = { eventSlug, orderType };

		// holy WTF batman.. we have to wait for the order to process before trying again.
		return new Promise((resolve) => {
			setTimeout(() => {
				return client
					.secureQuery({ query: QUERY_MY_ORDERS, variables })
					.then(({ data, errors }) => {
						if (errors) log({ errors, tag: 'QUERY_MY_ORDERS' });

						const orders = data.events?.me?.orders;
						resolve(orders);
					});
			}, 2500);
		});
	}

	return { queryMyAcceptedSpeaker, queryMyOrders, querySpeakerAcceptDownValues };
};
