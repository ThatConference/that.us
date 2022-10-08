import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ fetch }) {
	const { querySessionsByDate } = sessionsApi(fetch);

	return {
		activities: await querySessionsByDate({ pageSize: 100 })
	};
}
