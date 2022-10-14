import lodash from 'lodash';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

const { sortBy } = lodash;

export async function load({ fetch }) {
	const { queryMyTicketAllocations } = ordersApi(fetch);

	let tickets = await queryMyTicketAllocations().then((r) => {
		return sortBy(r, 'event.startDate').reverse();
	});

	return {
		tickets
	};
}
