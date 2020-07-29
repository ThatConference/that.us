import config from '../../config';

export const QUERY_SUBMISSIONS = `
  query getMySubmissions {
    sessions {
      me {
        submitted {      
          ... on Base {
            id
            eventId
            type
            status
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

export default (client) => {
  const queryMySubmissions = () => {
    const variables = { eventId: config.eventId };
    return client
      .query(QUERY_SUBMISSIONS, variables)
      .toPromise()
      .then((r) => {
        let results = [];

        const { submitted } = r.data.sessions.me;

        if (submitted)
          results = submitted
            .filter((s) => s.type === 'OPEN_SPACE')
            .filter((s) => s.eventId === config.eventId);

        return results;
      });
  };

  return { queryMySubmissions };
};
