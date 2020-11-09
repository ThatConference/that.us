import * as Sentry from '@sentry/browser';

export const QUERY_ME = `
    query getMe {
      members {
        me {
          id
          firstName
          lastName
          email
          jobTitle
          company
          profileImage
          profileSlug
          profileLinks {
            isPublic
            linkType
            url
          }
          earnedMeritBadges {
            id
            name
            image
            description
          }
          bio
          canFeature
          isOver13
          acceptedCodeOfConduct
          acceptedTermsOfService
          acceptedAntiHarassmentPolicy
          acceptedCommitmentToDiversity
          isDeactivated
          lifeHack
          interests
        }
      }
    }
`;

export default client => {
  const queryMe = () =>
    client
      .query(QUERY_ME)
      .toPromise()
      .then(r => {
        if (r.error) {
          Sentry.captureException(new Error(r.error), {
            tags: {
              api_that_tech: 'query_favorites',
            },
          });
        }

        return r.data.members.me;
      });

  return {
    queryMe,
  };
};
