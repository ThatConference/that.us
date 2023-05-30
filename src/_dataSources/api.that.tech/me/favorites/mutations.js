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

const ROTATE_ICALENDAR_URL = `
  mutation rotateICalendarUrl {
    members {
      member {
        rotateICalenarUrl
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function toggle(sessionId, eventId) {
		const variables = {
			sessionId,
			eventId
		};

		return client.mutation({ mutation: TOGGLE_FAVORITE, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'TOGGLE_FAVORITE' });

			return data?.sessions?.favoriting?.toggle?.session;
		});
	}

	function rotateICalendarUrl() {
		const variables = {};

		return client
			.mutation({ mutation: ROTATE_ICALENDAR_URL, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'ROTATE_ICALENDAR_URL' });

				return data?.members?.member?.rotateICalenarUrl;
			});
	}

	return {
		toggle,
		rotateICalendarUrl
	};
};
