import favoritesApi from '$dataSources/api.that.tech/favorites';
import config from '$utils/config.public';

export async function load({ fetch }) {
	const { get } = favoritesApi(fetch);

	const activities = await get(config.eventId);

	return {
		activities
	};
}
