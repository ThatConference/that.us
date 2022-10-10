import favoritesApi from '$dataSources/api.that.tech/favorites';
import config from '$utils/config.public';

export async function load() {
	const { get } = favoritesApi();

	const activities = await get(config.eventId);

	return {
		activities
	};
}
