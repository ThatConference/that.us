import ordersApi from '$dataSources/api.that.tech/orders/queries';

export async function load({ fetch }) {
	const { queryMyBulkAllocations } = ordersApi(fetch);

	const orders = await queryMyBulkAllocations();

	return {
		orders
	};
}
