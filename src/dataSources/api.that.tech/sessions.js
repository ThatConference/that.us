import dayjs from 'dayjs';

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
  }
`;

const coreOpenSpaceFields = `
  fragment coreFields on OpenSpace {
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
  query getSessionById($sessionId: ID!) {
    sessions {
      session(sessionId: $sessionId) {
        ...coreFields
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
  query GetEventsSessions ($eventId: ID!, $pageSize: Int, $cursor: String) {
    events {
      event(findBy: { id: $eventId }) {
        get {
          sessions(pageSize: $pageSize, cursor: $cursor) {
            cursor
            sessions{
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
  query GetEventsSessions ($eventId: ID!, $pageSize: Int, $cursor: String) {
    events {
      event(findBy: { id: $eventId }) {
        get {
          sessions(pageSize: $pageSize, cursor: $cursor) {
            cursor
            sessions{
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

export const QUERY_SESSIONS_BY_DATE = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query GetEventsSessions ($eventId: ID!, $asOfDate: Date, $pageSize: Int) {
    events {
      event(findBy: { id: $eventId }) {
        get {
          sessions(asOfDate: $asOfDate, status: ACCEPTED, pageSize: $pageSize) {
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
    }
  }
`;

export const QUERY_NEXT_SESSIONS_BY_DATE = `
  ${coreSessionFields}
  ${coreSpeakerFields}
  query GetEventsSessions ($eventId: ID!, $asOfDate: Date, $pageSize: Int, $cursor: String) {
    events {
      event(findBy: { id: $eventId }) {
        get {
          sessions(asOfDate: $asOfDate, status: ACCEPTED, pageSize: $pageSize, cursor: $cursor) {
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
    }
  }
`;

export const CREATE_SESSION = `
  ${coreOpenSpaceFields}
  mutation createSession($eventId: ID!, $newSession: OpenSpaceCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        openSpace(openspace: $newSession) {
          ...coreFields
        }
      }
    }
  }
`;

export const UPDATE_SESSION_BY_ID = `
  ${coreOpenSpaceFields}
  mutation UpdateOpenSpaceSession($sessionId: ID!, $session: OpenSpaceUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          openSpace (openspace: $session) {
            ...coreFields
          }
        }
      }
    }
  }
`;

export const SET_ATTENDANCE = `
  mutation setAttendance($sessionId: ID!) {
    sessions {
      session(id: $sessionId) {
        setAttended
      }
    }
  }
`;

function stripAuthorization(client) {
  const newHeaders = {
    ...client.fetchOptions().headers,
  };

  delete newHeaders.authorization;
  return newHeaders;
}

export default client => {
  const query = (graphQuery, variables) =>
    client
      .query(graphQuery, variables, {
        fetchOptions: {
          headers: {
            ...stripAuthorization(client),
          },
        },
      })
      .toPromise()
      .then(r => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('query sessions failed.');
        }

        const { get } = r.data.events.event;
        return get ? get.sessions : null;
      });

  const querySessions = ({ eventId, pageSize = 50 }) =>
    query(QUERY_SESSIONS, { eventId, pageSize });

  const queryNextSessions = ({ eventId, pageSize = 50, cursor }) =>
    query(QUERY_NEXT_SESSIONS, { eventId, pageSize, cursor });

  const querySessionsByDate = ({
    eventId,
    pageSize = 50,
    asOfDate = dayjs().startOf('day'),
  }) =>
    query(
      QUERY_SESSIONS_BY_DATE,
      { eventId, asOfDate, pageSize },
      {
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      },
    );

  const queryNextSessionsByDate = ({
    eventId,
    cursor,
    pageSize = 50,
    asOfDate = dayjs().startOf('day'),
  }) =>
    query(
      QUERY_NEXT_SESSIONS_BY_DATE,
      { eventId, asOfDate, pageSize, cursor },
      {
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      },
    );

  // todo eventId can go when API is up
  const getById = sessionId => {
    const variables = { sessionId };

    return client
      .query(QUERY_SESSION_BY_ID, variables, {
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      })
      .toPromise()
      .then(r => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('Error on getSessionById API call.');
        }

        return r.data.sessions.session;
      });
  };

  const create = (sessionDetails, eventId) => {
    const mutationVariables = {
      eventId,
      newSession: {
        ...sessionDetails,
      },
    };

    return client
      .mutation(CREATE_SESSION, mutationVariables)
      .toPromise()
      .then(r => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('Error on createSession API call.');
        }

        return r.data.sessions.create.openSpace;
      });
  };

  const update = (sessionId, session) => {
    const mutationVariables = {
      sessionId,
      session,
    };

    return client
      .mutation(UPDATE_SESSION_BY_ID, mutationVariables)
      .toPromise()
      .then(r => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('Error on updateSession API call.');
        }

        return r.data.sessions.session.update.openSpace;
      });
  };

  const setAttendance = sessionId => {
    const mutationVariables = {
      sessionId,
    };

    return client.mutation(SET_ATTENDANCE, mutationVariables).toPromise();
  };

  return {
    querySessions,
    queryNextSessions,
    querySessionsByDate,
    queryNextSessionsByDate,
    getById,
    create,
    update,
    setAttendance,
  };
};
