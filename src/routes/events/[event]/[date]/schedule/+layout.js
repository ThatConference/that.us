import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ parent }) {
	const { querySessionsBySlug } = sessionsApi();

	let { eventSlug } = await parent();
	const sessions = await querySessionsBySlug({ slug: eventSlug, pageSize: 250 });

	return {
		sessions
	};
}
