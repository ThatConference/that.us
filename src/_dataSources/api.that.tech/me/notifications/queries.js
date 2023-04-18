import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

export const QUERY_ME_NOTIFICATION_PREFERENCES = `
	query QUERY_ME_NOTIFICATION_PREFERENCES{
		members{
			me {
				id
				notificationPreferences {
					meetThatCamper
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const queryMeNotificationPreferences = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_NOTIFICATION_PREFERENCES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_NOTIFICATION_PREFERENCES' });

				const { me } = data.members;
				return me ? me.notificationPreferences : undefined;
			});
	};

	return {
		queryMeNotificationPreferences
	};
};
