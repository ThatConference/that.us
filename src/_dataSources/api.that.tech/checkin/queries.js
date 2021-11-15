import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

const registrationProfileFragment = `
	fragment registrationProfileFragment on RegistrationProfile {  
		id
		firstName
		lastName
		email
		profileImage
		profileSlug
		company
		isMember
	}
`;

const productBaseFieldsFragment = `
	fragment productBaseFieldsFragment on ProductBase {
		id
		name
		description
		productType: type
		price
		isEnabled
	}
`;

const QUERY_EVENT_REGISTRATIONS = `
	${registrationProfileFragment}
	${productBaseFieldsFragment}
	query QUERY_EVENT_REGISTRATIONS ($eventSlug: String) {
		events {
			event(findBy: {slug: $eventSlug}) {
				registration {
					all {
						id
						orderDate
						orderAllocations {
							id
							isAllocated
							hasCheckedIn
							checkedInAt
							partnerPin
							receivedSwag
							checkedInBy {
								...registrationProfileFragment
							}
							allocatedTo {
								...registrationProfileFragment
							}
							purchasedBy {
								...registrationProfileFragment
							}
							product {
								...productBaseFieldsFragment
							}
							event {
								id
							}
						}
						member {
							...registrationProfileFragment
						}
					}
			}cp
			}
		}
	}   
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function queryEventRegistrations(eventSlug) {
		const variables = {
			eventSlug
		};
		return client
			.secureQuery({ query: QUERY_EVENT_REGISTRATIONS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_EVENT_REGISTRATIONS' });

				let results = [];
				if (data) {
					const { all } = data.events.event.registration;
					results = all;
				}

				return results;
			});
	}

	return {
		queryEventRegistrations
	};
};
