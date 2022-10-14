import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';
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
						id
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
								id
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

	return { queryMyAcceptedSpeaker, queryMyOrders };
};
