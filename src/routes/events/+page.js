import dayjs from 'dayjs';
import lodash from 'lodash';
import eventsApi from '$dataSources/api.that.tech/events/queries';

const { sortBy, take, drop } = lodash;

export async function load({ fetch }) {
	const events = await eventsApi(fetch)
		.queryEventsByCommunity()
		.then((r) => sortBy(r, 'endDate').reverse())
		.then((r) => {
			const splitAt = r.findIndex((i) => dayjs(i.endDate).isBefore(dayjs()));

			const upcoming = take(r, splitAt)
				.filter((i) => i.type.toLowerCase() !== 'daily')
				.reverse();
			const past = drop(r, splitAt);

			return [upcoming, past];
		});

	return {
		events
	};
}
