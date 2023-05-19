import favoritesApi from '$dataSources/api.that.tech/me/favorites/queries';
import config from '$utils/config.public';

export async function load({ fetch, parent }) {
	const { get } = favoritesApi(fetch);
	const { user } = await parent();

	let activities = await get(config.eventId);
	activities = activities.map((a) => a.session);

	return {
		activities,
		profile: user?.profile
	};
}
