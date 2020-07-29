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
        }
      }
    }
`;

export default (client) => {
  const queryMe = () =>
    client
      .query(QUERY_ME)
      .toPromise()
      .then((results) => ({
        ...results.data.members.me,
      }));

  return {
    queryMe,
  };
};
