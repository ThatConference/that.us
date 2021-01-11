/*
  TODO: Shelled out for now.... 
*/

import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

export const QUERY_EVENT_PRODUCTS = ``;

export default client => {
  function queryProductsByEvent(eventId) {
    const variables = { eventId };

    return client
      .query(QUERY_EVENT_PRODUCTS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENT_PRODUCTS');

        let results;

        if (data) {
        }

        return results;
      });
  }

  return { queryProductsByEvent };
};
