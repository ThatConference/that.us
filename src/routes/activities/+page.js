import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load() {
	const { querySessionsByDate } = sessionsApi();
	const activities = await querySessionsByDate({ pageSize: 100 });

	return {
		activities
	};
}
