import ordersApi from '$dataSources/api.that.tech/orders/queries';

export async function load() {
	const { queryMyBulkAllocations } = ordersApi();

	const orders = await queryMyBulkAllocations();

	return {
		orders
	};
}
