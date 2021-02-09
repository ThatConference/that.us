import { log } from './utilities/error';

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
            communities
            durationInMinutes
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

export default client => {
  const queryMySubmissions = () =>
    client
      .query(QUERY_SUBMISSIONS)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'mutate_sessions');

        let results = [];
        const { submitted } = data.sessions.me;

        if (submitted) {
          results = submitted
            .filter(s => s.type === 'OPEN_SPACE')
            .filter(s => s.status === 'ACCEPTED');

          results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        }

        return results;
      });

  return { queryMySubmissions };
};
