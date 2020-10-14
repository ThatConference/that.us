import communityFavorites from '../../../store/communityFavorites';

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
  async function toggleCommunityFavorite(communityId) {
    const variables = { communityId };
    return client
      .mutation(MUTATION_FOLLOW_COMMUNITY_TOGGLE, variables)
      .toPromise()
      .then(({ data, error }) => {
        let results = false;

        if (data) {
          console.log('dataSource returned', data);
          const { toggle: fav } = data.communities.favoriting;
          results = !!fav;
        }
        console.log({ results });
        return results;
      });
  }

  return { toggleCommunityFavorite };
};
