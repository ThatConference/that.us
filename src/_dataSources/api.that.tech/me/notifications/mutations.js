import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

export const MUTATION_UPDATE_NOTIFICATION_PREFERENCES = `
	mutation MUTATION_UPDATE_NOTIFICATION_PREFERENCES($profile: ProfileUpdateInput!) {
		members {
			member {
				update(profile: $profile) {
					notificationPreferences {
						meetThatCamper
					}
				}
			}
		}
	}
`;
export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function updateNotificationPreferences(notificationPreference) {
		const variables = {
			profile: {
				notificationPreferences: {
					...notificationPreference
				}
			}
		};

		return client
			.mutation({ mutation: MUTATION_UPDATE_NOTIFICATION_PREFERENCES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_UPDATE_NOTIFICATION_PREFERENCES' });

				let results;

				if (data) {
					const { update } = data.members.member;
					results = update ? update.notificationPreference : undefined;
				}

				return results;
			});
	}

	return { updateNotificationPreferences };
};
