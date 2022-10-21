import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

const favoriteFragment = `
  fragment sessionFields on AcceptedSession {
    id
		eventId
    title
    shortDescription
    status
    startTime
    tags
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
`;

export const QUERY_MY_FAVORITES = `
  ${favoriteFragment}
  query memberFavorites ($eventId: ID!) {
    sessions {
      me {
        favorites(eventId: $eventId) {
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
			eventId: 'ANY'
		};

		return client.secureQuery({ query: QUERY_MY_FAVORITES, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_MY_FAVORITES' });

			let results = data?.sessions?.me?.favorites || [];

			results = results.filter((s) => s).filter((s) => s.status === 'ACCEPTED');
			results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

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
