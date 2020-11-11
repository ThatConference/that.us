import { log } from '../utilities/error';

export const MUTATION_FOLLOW_COMMUNITY_TOGGLE = `
  mutation followCommunity($communityId: ID) {
    communities {
      favoriting(findBy: {id: $communityId}) {
        toggle {
          id
        }
      }
    }
  }
`;

export default client => {
  function toggleFollow(communityId) {
    const variables = { communityId };
    return client
      .mutation(MUTATION_FOLLOW_COMMUNITY_TOGGLE, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'mutate_community');

        let results = false;
        if (data) {
          const { toggle } = data.communities.favoriting;
          results = !!toggle;
        }

        return results;
      });
  }

  return { toggleFollow };
};
