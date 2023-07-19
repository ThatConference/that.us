import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ parent, url }) {
	const { querySessionsBySlug } = sessionsApi();

	console.log('params', url);
	let filterForFamily = url.searchParams.get('family') === 'true';

	let { event } = await parent();
	const sessions = await querySessionsBySlug({ slug: event.slug, pageSize: 250 });

	return {
		sessions,
		filterForFamily
	};
}
