import { writable } from 'svelte/store';

import gFetch from '$utils/gFetch';
import { log } from './utilities/error';

const favoriteFragment = `
  fragment sessionFields on AcceptedSession {
    id
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

const TOGGLE_FAVORITE = `
  ${favoriteFragment}
  mutation toggleFavorite($eventId: ID!, $sessionId: ID!) {
    sessions {
      favoriting(eventId: $eventId) {
        toggle(sessionId: $sessionId) {
          ...sessionFields
        }
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

export default () => {
	const client = gFetch();
	const favoritesStore = writable([]);

	function query(eventId) {
		const variables = {
			eventId: 'ANY'
		};

		return client
			.query(QUERY_MY_FAVORITES, variables)
			.toPromise()
			.then(({ data, error }) => {
				if (error) log(error, 'query_favorites');

				let results = [];

				// set the store
				if (data && !error) {
					const { favorites } = data.sessions.me;

					results = favorites;

					results = results.filter((s) => s).filter((s) => s.status === 'ACCEPTED');
					results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

					favoritesStore.set(results); // set the store
				}

				return results;
			});
	}

	async function toggle(sessionId, eventId) {
		const mutationVariables = {
			eventId,
			sessionId
		};
		let results = false;

		const { data, error } = await client.mutation(TOGGLE_FAVORITE, mutationVariables).toPromise();

		if (error) log(error, 'mutate_favorites');

		// update store
		if (data) {
			const { toggle: fav } = data.sessions.favoriting;
			if (fav) {
				// is toggled
				favoritesStore.update((i) => [...i, fav]);
				results = true;
			} else {
				// not toggled
				favoritesStore.update((favs) => favs.filter((i) => i.id !== sessionId));
				results = false;
			}
		}

		return results;
	}

	const get = (eventId) => query(eventId);
	const getIds = (eventId) => query(eventId).then((r) => r.map((i) => i.id));

	// favoritesStore.set(query());

	return {
		favoritesStore,
		get,
		getIds,
		toggle
	};
};
