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

export default (client) => {
  const querySessions = (eventId, onOrAfter = new Date(), daysAfter = 30) => {
    const variables = { eventId, onOrAfter, daysAfter };
    return client
      .query(QUERY_SESSIONS, variables)
      .toPromise()
      .then((r) => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('query sessions failed.');
        }

        let results = [];
        results = r.data.events.event.get.sessions.filter(
          (i) => i.status === 'ACCEPTED',
        );

        results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        return results;
      });
  };

  const queryAllEventsSessions = (eventId) => {
    const variables = { eventId };
    return client
      .query(QUERY_SESSIONS, variables)
      .toPromise()
      .then((r) => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('query sessions failed.');
        }

        let results = [];

        results = r.data.events.event.get.sessions.filter(
          (i) => i.status === 'ACCEPTED',
        );

        results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        return results;
      });
  };

  // todo eventId can go when API is up
  const getById = (sessionId) => {
    const variables = { sessionId };

    return client
      .query(QUERY_SESSION_BY_ID, variables)
      .toPromise()
      .then((r) => {
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
      .then((r) => {
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
      .then((r) => {
        if (r.error) {
          // eslint-disable-next-line no-console
          console.error(r.error);
          throw new Error('Error on updateSession API call.');
        }

        return r.data.sessions.session.update.openSpace;
      });
  };

  const setAttendance = (sessionId) => {
    const mutationVariables = {
      sessionId,
    };

    return client.mutation(SET_ATTENDANCE, mutationVariables).toPromise();
  };

  return {
    querySessions,
    queryAllEventsSessions,
    getById,
    create,
    update,
    setAttendance,
  };
};
