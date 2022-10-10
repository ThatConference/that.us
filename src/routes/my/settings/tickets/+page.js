import lodash from 'lodash';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

const { sortBy } = lodash;

export async function load() {
	const { queryMyTicketAllocations } = ordersApi();

	let tickets = await queryMyTicketAllocations().then((r) => {
		return sortBy(r, 'event.startDate').reverse();
	});

	return {
		tickets
	};
}
