import gFetch from '$utils/gFetch';

import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

const productBaseFieldsFragment = `
  fragment productBaseFields on ProductBase {
    id
    name
    description
    productType: type
    price
    isEnabled
  }
`;

export const QUERY_EVENT_PRODUCTS = `
  ${productBaseFieldsFragment}
  query QueryEventProducts($eventId: ID!) {
    events {
      event(findBy: {id: $eventId}) {
        get {
          products {
            ...productBaseFields
          }
        }
      }
    }
  }
`;

export default () => {
	const client = gFetch();

	function queryProductsByEvent(eventId) {
		const variables = { eventId };

		return client
			.query(QUERY_EVENT_PRODUCTS, variables, {
				fetchOptions: { headers: { ...stripAuthorizationHeader(client) } }
			})
			.toPromise()
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_EVENT_PRODUCTS');

				const { event } = data.events;
				return event ? event.get.products : [];
			});
	}

	return { queryProductsByEvent };
};
