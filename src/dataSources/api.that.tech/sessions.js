import config from '../../config';

export const QUERY_SESSIONS = `
  query GetEventsSessions ($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          sessions {
            id
            title
            shortDescription
            status
            startTime
            tags
            speakers {
              id
              firstName
              lastName
              profileImage
            }
          }
        }
      }
    }
  }
`;

export default (client) => {
  const querySessions = () => {
    const variables = { eventId: config.eventId };
    return client
      .query(QUERY_SESSIONS, variables)
      .toPromise()
      .then((r) => r.data.events.event.get.sessions);
  };

  return { querySessions };
};
