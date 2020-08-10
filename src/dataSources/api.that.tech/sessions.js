import config from '../../config';

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
  }
`;

export const QUERY_SESSION_BY_ID = `
  ${coreSessionFields}
  query getSessionById($eventId: ID!, $sessionId: ID!) {
    events {
      event(id: $eventId) {
        session: sessionById(sessionId: $sessionId) {
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
  }
`;

export const QUERY_SESSIONS = `
  ${coreSessionFields}
  query GetEventsSessions ($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          sessions {
            ...coreFields
            speakers {
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

export default (client, eventId = config.eventId) => {
  const querySessions = () => {
    const variables = { eventId };
    return client
      .query(QUERY_SESSIONS, variables)
      .toPromise()
      .then((r) =>
        r.data.events.event.get.sessions.filter((i) => i.status === 'ACCEPTED'),
      );
  };

  const getById = (sessionId) => {
    const variables = { eventId, sessionId };

    return client
      .query(QUERY_SESSION_BY_ID, variables)
      .toPromise()
      .then((r) => r.data.events.event.session);
  };

  const create = (sessionDetails) => {
    const mutationVariables = {
      eventId,
      newSession: {
        ...sessionDetails,
      },
    };

    return client
      .mutation(CREATE_SESSION, mutationVariables)
      .toPromise()
      .then((r) => r.data.sessions.create.openSpace);
  };

  const update = (sessionId, session) => {
    const mutationVariables = {
      sessionId,
      session,
    };

    return client
      .mutation(UPDATE_SESSION_BY_ID, mutationVariables)
      .toPromise()
      .then((r) => r.data.sessions.session.update.openSpace);
  };

  const setAttendance = (sessionId) => {
    const mutationVariables = {
      sessionId,
    };

    return client.mutation(SET_ATTENDANCE, mutationVariables).toPromise();
  };

  return { querySessions, getById, create, update, setAttendance };
};
