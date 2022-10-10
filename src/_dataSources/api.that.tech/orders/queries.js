import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

const defaultPageSize = 10;

const myOrdersFragment = `
	fragment orderFields on MeOrder {  
		id
		total
		orderDate
	}
`;

const productBaseFragment = `
	fragment productFields on ProductBase {  
		id
		name
		type
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

export const QUERY_ORDER_RECEIPT = `
	query QUERY_ORDER_RECEIPT($orderId: ID!) {
		orders {
			me {
				order(orderId: $orderId) {
					id
					receipt
				}
			}
		}
	}
`;

export const QUERY_MY_ALLOCATIONS = `
	${productBaseFragment}
	query QUERY_MY_ALLOCATIONS {
		orders {
			me {
				allocations {
					id
					event {
						id
						name
						slug
						startDate
						endDate
					}
					product {
						...productFields
					}
				}
			}
		}
	}
`;

const allocationsFragment = `
	fragment allocationsFragment on PagedMeOrders {
		cursor
		count
		
		orders {
			id
			orderDate
			total
			
			orderAllocations {
				id
				isAllocated

				allocatedTo {
					... on PrivateProfile {
						id
						firstName
						lastInitial
					}
					... on PublicProfile {
						id
						firstName
						lastName
					}
				}
				
				event {
					id
					name
					logo
					slug
				}

				product {
					... on ProductBase {
						id
						name            
						ticketType: type
					}
				}
				
				allocatedTo {
					... on PrivateProfile {
						id
						firstName
						lastInitial              
					}
				}
			}
		}
	}
`;

export const QUERY_MY_BULK_ALLOCATIONS = `
	${allocationsFragment}
	query QUERY_MY_BULK_ALLOCATIONS($pageSize: Int) {
		orders {
			me {
				all(pageSize: $pageSize) {
					...allocationsFragment
				}
			}
		}
	}
`;

export const QUERY_MY_BULK_ALLOCATIONS_NEXT = `
	${allocationsFragment}
	query QUERY_MY_BULK_ALLOCATIONS_NEXT($pageSize: Int, $cursor: String) {
		orders {
			me {
				all(pageSize: $pageSize, cursor: $cursor) {
					...allocationsFragment
				}
			}
		}
	}
`;

export default () => {
	const client = gFetch();

	function queryMyOrders(pageSize = defaultPageSize) {
		const variables = {
			pageSize
		};

		return client.secureQuery({ query: QUERY_MY_ORDERS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_MY_ORDERS' });

			const { orders } = data;
			return orders ? orders.me.all : null;
		});
	}

	function queryMyOrdersNext(cursor, pageSize = defaultPageSize) {
		const variables = {
			cursor,
			pageSize
		};

		return client
			.secureQuery({ query: QUERY_NEXT_MY_ORDERS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_NEXT_MY_ORDERS' });

				const { orders } = data;
				return orders ? orders.me.all : null;
			});
	}

	function queryOrderReceiptUrl(orderId) {
		const variables = {
			orderId
		};

		return client
			.secureQuery({ query: QUERY_ORDER_RECEIPT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ORDER_RECEIPT' });

				const { receipt } = data.orders.me.order;
				return receipt || null;
			});
	}

	function queryMyAllocations() {
		const variables = {};

		return client
			.secureQuery({ query: QUERY_MY_ALLOCATIONS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_MY_ALLOCATIONS' });

				const { allocations } = data.orders.me;
				return allocations || [];
			});
	}

	function queryMyTicketAllocations() {
		return queryMyAllocations().then((r) => r.filter((t) => t.product.type === 'TICKET'));
	}

	function queryMyBulkAllocations(pageSize = defaultPageSize) {
		const variables = {
			pageSize
		};

		return client
			.secureQuery({ query: QUERY_MY_BULK_ALLOCATIONS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_MY_BULK_ALLOCATIONS' });

				const { orders } = data;
				return orders ? orders.me.all : null;
			});
	}

	function queryMyBulkAllocationsNext(cursor, pageSize = defaultPageSize) {
		const variables = {
			cursor,
			pageSize
		};

		return client
			.secureQuery({ query: QUERY_MY_BULK_ALLOCATIONS_NEXT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_MY_BULK_ALLOCATIONS_NEXT' });

				const { orders } = data;
				return orders ? orders.me.all : null;
			});
	}

	return {
		queryMyOrders,
		queryMyOrdersNext,
		queryOrderReceiptUrl,
		queryMyAllocations,
		queryMyTicketAllocations,
		queryMyBulkAllocations,
		queryMyBulkAllocationsNext
	};
};
