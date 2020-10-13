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

    let results = false;

    const { data, error } = await client
      .mutation(MUTATION_FOLLOW_COMMUNITY_TOGGLE, variables)
      .toPromise();

    if (data) {
      const { toggle: fav } = data.communities.favoriting;
      if (fav) {
        // is toggled
        // communityFavorites.update(i => [...i, fav]);
        results = true;
      } else {
        // not toggled
        // communityFavorites.update(favs =>
        //   favs.filter(i => i.id !== communityId),
        // );
        results = false;
      }
    }

    return results;
  }

  return { toggleCommunityFavorite };
};
