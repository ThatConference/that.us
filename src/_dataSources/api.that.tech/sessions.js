import dayjs from 'dayjs';

import gFetch from '$utils/gfetch';

import { log } from './utilities/error';

const defaultPageSize = 50;

const coreSessionFields = `
  fragment coreFields on AcceptedSession {
    id
    eventId
    title
    shortDescription
    tags
    type
    status
    startTime
    durationInMinutes
    slug
    communities
    targetLocation
    location {
      destination
      isOnline
      url
    }
    agenda
    longDescription
    prerequisites
    takeaways
    supportingArtifacts {
      name
      url
      description
    }
  }
`;

const coreOpenSpaceFields = `
  fragment coreFields on OpenSpace {
    id
    eventId
    title
    shortDescription
    longDescription
    prerequisites
    takeaways
    supportingArtifacts {
      name
      url
      description
    }
    tags
    type
    status
    startTime
    durationInMinutes
    slug
  }
`;

const coreSpeakerFields = `
  fragment coreSpeakerFields on PublicProfile {
    id
    firstName
    lastName
    bio
    jobTitle
    company
    profileImage
    profileSlug
    earnedMeritBadges {
      id
      name
      image
      description
    }
  }
`;

export const QUERY_SESSION_BY_ID = `
  ${coreSessionFields}
  query QUERY_SESSION_BY_ID($sessionId: ID!) {
    sessions {
      session(sessionId: $sessionId) {
        ...coreFields
        event {
          id
          startDate
          endDate
          logo
          slug
        }
        speakers {
          firstName
          lastName
          bio
          jobTitle
          company
          profileImage
          profileSlug
          profileLinks {
            linkType
            url
            isPublic                  
          }
          earnedMeritBadges {
            id
            name
            image
            description
          }
        }
        favoritedBy {
          id
          firstName
          lastName
          profileImage
          profileSlug
        }
      }
    }
  }
`;

export const QUERY_SESSIONS = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query QUERY_SESSIONS ($pageSize: Int, $cursor: String) {
    sessions {
      all(pageSize: $pageSize, cursor: $cursor) {
        cursor
        count
        sessions{
          ...coreFields
          speakers {
            ...coreSpeakerFields
          }
        }
      }
    }
  }
`;

export const QUERY_SESSIONS_BY_SLUG = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query QUERY_SESSIONS_BY_SLUG ($slug: String!, $pageSize: Int, $cursor: String) {
    events {
      event (findBy: { slug: $slug }) {
        get {
          id
          name
          startDate
          endDate
          sessions(pageSize: $pageSize, status: ACCEPTED, cursor: $cursor) {
            cursor
            count
            sessions {
              ...coreFields
              speakers {
                ...coreSpeakerFields
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_NEXT_SESSIONS = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query QUERY_NEXT_SESSIONS ($pageSize: Int, $cursor: String) {
    sessions {
      all (pageSize: $pageSize, status: ACCEPTED, cursor: $cursor) {
        cursor
        count
        sessions {
          ...coreFields
          event {
            id
            name
            slug
          }
          speakers {
            ...coreSpeakerFields
          }
        }
      }
    }
  }
`;

export const QUERY_SESSIONS_BY_DATE = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query QUERY_SESSIONS_BY_DATE ($asOfDate: Date, $pageSize: Int) {
    sessions {
      all (asOfDate: $asOfDate, status: ACCEPTED, pageSize: $pageSize) {
        cursor
        sessions {
          ...coreFields
          event {
            id
            name
            slug
          }
          speakers {
            ...coreSpeakerFields
          }
        }
      }
    }
  }
`;

export const QUERY_NEXT_SESSIONS_BY_DATE = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query QUERY_NEXT_SESSIONS_BY_DATE ($asOfDate: Date, $pageSize: Int, $cursor: String) {
    sessions {
      all(asOfDate: $asOfDate, status: ACCEPTED, pageSize: $pageSize, cursor: $cursor) {
        cursor
        sessions {
          ...coreFields
          speakers {
            ...coreSpeakerFields
          } 
        }
      }
    }
  }
`;

export const CREATE_SESSION = `
  ${coreOpenSpaceFields}
  mutation CREATE_SESSION($eventId: ID!, $newSession: OpenSpaceCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        openSpace (session: $newSession) {
          ...coreFields
        }
      }
    }
  }
`;

export const UPDATE_SESSION_BY_ID = `
  ${coreOpenSpaceFields}
  mutation UPDATE_SESSION_BY_ID($sessionId: ID!, $session: OpenSpaceUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          openSpace (session: $session) {
            ...coreFields
          }
        }
      }
    }
  }
`;

export const SET_ATTENDANCE = `
  mutation SET_ATTENDANCE($sessionId: ID!) {
    sessions {
      session(id: $sessionId) {
        setAttended
      }
    }
  }
`;

export const QUERY_SESSION_BY_ID_SHORT = `
  query querySessionById($sessionId: ID!) {
    sessions {
      session (sessionId: $sessionId) {  
        title
        shortDescription
        eventId
        event {
          slug
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const query = (graphQuery, variables) =>
		client.query({ query: graphQuery, variables }).then(({ data, error }) => {
			if (error) log(error, 'query_sessions');

			const { all } = data.sessions;
			return all || [];
		});

	const querySessions = ({ eventId, pageSize = defaultPageSize }) =>
		query(QUERY_SESSIONS, { eventId, pageSize });

	const querySessionsBySlug = ({ slug, cursor, pageSize = defaultPageSize }) => {
		const variables = {
			slug,
			pageSize,
			cursor
		};

		return client.query({ query: QUERY_SESSIONS_BY_SLUG, variables }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_SESSIONS_BY_SLUG');

			const { get } = data.events.event;
			return get || null;
		});
	};

	const querySessionById = (sessionId) => {
		const variables = {
			sessionId
		};

		return client.query({ query: QUERY_SESSION_BY_ID_SHORT, variables }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_SESSION_BY_ID_SHORT');

			const { session } = data.sessions;
			return session || null;
		});
	};

	function queryNextSessions({ pageSize = defaultPageSize, cursor }) {
		return query(QUERY_NEXT_SESSIONS, { pageSize, cursor });
	}

	function querySessionsByDate({ pageSize = defaultPageSize, asOfDate }) {
		asOfDate = asOfDate || dayjs().startOf('day');
		const variables = { asOfDate, pageSize };

		return client
			.query({
				query: QUERY_SESSIONS_BY_DATE,
				variables
			})
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_SESSIONS_BY_DATE');

				const { all } = data.sessions;
				return all || [];
			});
	}

	function queryNextSessionsByDate({
		cursor,
		pageSize = defaultPageSize,
		asOfDate = dayjs().startOf('day')
	}) {
		const variables = { asOfDate, pageSize, cursor };

		return query({
			query: QUERY_NEXT_SESSIONS_BY_DATE,
			variables
		});
	}

	const getById = (sessionId) => {
		const variables = { sessionId };

		return client.query({ query: QUERY_SESSION_BY_ID, variables }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_SESSION_BY_ID');

			return data.sessions.session;
		});
	};

	const create = (sessionDetails, eventId) => {
		const variables = {
			eventId,
			newSession: {
				...sessionDetails
			}
		};

		return client.mutation({ mutation: CREATE_SESSION, variables }).then(({ data, error }) => {
			if (error) log(error, 'CREATE_SESSION');

			return data.sessions.create.openSpace;
		});
	};

	const update = (sessionId, session) => {
		const variables = {
			sessionId,
			session
		};

		return client
			.mutation({ mutation: UPDATE_SESSION_BY_ID, variables })

			.then(({ data, error }) => {
				if (error) log(error, 'UPDATE_SESSION_BY_ID');

				return data.sessions.session.update.openSpace;
			});
	};

	const setAttendance = (sessionId) => {
		const variables = {
			sessionId
		};

		return client.mutation({ mutation: SET_ATTENDANCE, variables });
	};

	return {
		querySessions,
		querySessionsBySlug,
		querySessionById,
		queryNextSessions,
		querySessionsByDate,
		queryNextSessionsByDate,
		getById,
		create,
		update,
		setAttendance
	};
};
