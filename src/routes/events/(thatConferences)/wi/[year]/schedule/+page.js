import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ parent }) {
	const { querySessionsBySlug } = sessionsApi();

	let { event } = await parent();
	const sessions = await querySessionsBySlug({ slug: event.slug, pageSize: 250 });

	return {
		sessions
	};
}
