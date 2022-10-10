import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ params, fetch }) {
	const { querySessionsBySlug } = sessionsApi(fetch);

	const { state, year } = params;
	const eventSlug = `${state}/${year}`;

	const event = await querySessionsBySlug({ slug: eventSlug });
	// todo.. What do we do in the scenario where the event isn't found?

	console.log(eventSlug, { event });

	return {
		event
	};
}
