import gFetch from '$utils/gFetch';

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
          isMember
        }
      }
    }
`;

export default () => {
	const client = gFetch();

	const queryMe = () =>
		client.query({ query: QUERY_ME }).then(({ data, error }) => {
			if (error) log(error, 'query_favorites');

			return data.members.me;
		});

	return {
		queryMe
	};
};
