import { log } from '../utilities/error';

const defaultPageSize = 10;

const myOrdersFragment = `
fragment orderFields on Order {  
  id
  total
  orderDate
  }
`;

export const QUERY_MY_ORDERS = `
  ${myOrdersFragment}
  query QUERY_MY_ORDERS($pageSize: Int) {
    orders {
      me {
        all(pageSize: $pageSize) {
          cursor
          count
          orders {
            ...orderFields
          }
        }
      }
    }
  }
`;

export const QUERY_NEXT_MY_ORDERS = `
  ${myOrdersFragment}
  query QUERY_NEXT_MY_ORDERS($cursor: String, $pageSize: Int) {
    orders {
      me {
        all(cursor: $cursor, pageSize: $pageSize) {
          cursor
          count
          orders {
            ...orderFields
          }
        }
      }
    }
  }
`;

export default client => {
  function queryMyOrders(pageSize = defaultPageSize) {
    const variables = {
      pageSize,
    };

    return client
      .query(QUERY_MY_ORDERS, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_MY_ORDERS');

        const { orders } = data;
        return orders ? orders.me.all : null;
      });
  }

  function queryMyOrdersNext(cursor, pageSize = defaultPageSize) {
    const variables = {
      cursor,
      pageSize,
    };

    return client
      .query(QUERY_NEXT_MY_ORDERS, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_NEXT_MY_ORDERS');

        const { orders } = data;
        return orders ? orders.me.all : null;
      });
  }

  return { queryMyOrders, queryMyOrdersNext };
};
