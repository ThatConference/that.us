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
        }
      }
    }
  }   
`;

export default () => {
	const client = gFetch();

	function queryEventRegistrations(eventSlug) {
		const variables = {
			eventSlug
		};
		return client
			.query(QUERY_EVENT_REGISTRATIONS, variables, {
				requestPolicy: 'cache-and-network'
			})
			.toPromise()
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_EVENT_REGISTRATIONS');

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
