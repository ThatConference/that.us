import favoritesApi from '$dataSources/api.that.tech/me/favorites/queries';
import config from '$utils/config.public';

export async function load({ fetch }) {
	const { get } = favoritesApi(fetch);

	let activities = await get(config.eventId);
	activities = activities.map((a) => a.session);

	return {
		activities
	};
}
