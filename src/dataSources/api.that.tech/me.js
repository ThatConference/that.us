import { log } from './utilities/error';

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
      .then(({ data, error }) => {
        if (error) log(error, 'query_favorites');

        return data.members.me;
      });

  return {
    queryMe,
  };
};
