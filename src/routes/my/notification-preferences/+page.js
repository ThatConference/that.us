import notificationsApi from '$dataSources/api.that.tech/me/notifications/queries';

export async function load({ fetch }) {
	const { queryMeNotificationPreferences } = notificationsApi(fetch);
	const notificationPreferences = await queryMeNotificationPreferences();

	return {
		notificationPreferences
	};
}
