/*
  TODO: Shelled out for now.... 
*/

import { log } from '../utilities/error';

export const QUERY_MY_ORDER = ``;
export const QUERY_MY_ORDERS = ``;

export default client => {
  function myOrder() {
    const variables = {};

    return client
      .mutation(QUERY_MY_ORDER, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_orders');

        let results;

        if (data) {
        }

        return results;
      });
  }

  function myOrders() {
    const variables = {};

    return client
      .mutation(QUERY_MY_ORDERS, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_orders');

        let results;

        if (data) {
        }

        return results;
      });
  }

  return { myOrder, myOrders };
};
