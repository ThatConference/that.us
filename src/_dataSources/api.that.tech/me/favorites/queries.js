import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

const favoriteFragment = `
  fragment sessionFields on SessionFavorite {
    id
    session {
      id
      eventId
      title
      shortDescription
      durationInMinutes
      status
      startTime
      tags
      targetLocation
      location {
        destination
        isOnline
        url
      }
      type
      category
      communities
      speakers {
        id
        firstName
        lastName
        profileImage
        profileSlug
        earnedMeritBadges {
          id
          name
          image
          description
        }
      }  
    }
  }
`;

export const QUERY_MY_FAVORITES = `
  ${favoriteFragment}
  query memberFavorites ($eventId: ID! $historyDays: Int) {
    sessions {
      me {
        favorites(eventId: $eventId historyDays: $historyDays) {
          ...sessionFields
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function query() {
		const variables = {
			eventId: 'ANY',
			historyDays: 30
		};

		return client.secureQuery({ query: QUERY_MY_FAVORITES, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_MY_FAVORITES' });

			let results = data?.sessions?.me?.favorites || [];

			results = results.filter((s) => s?.session?.status === 'ACCEPTED');
			results.sort((a, b) => new Date(a?.session?.startTime) - new Date(b?.session?.startTime));

			return results;
		});
	}

	const get = () => query();
	const getIds = () => query().then((r) => r.map((i) => i.id));

	return {
		get,
		getIds
	};
};
