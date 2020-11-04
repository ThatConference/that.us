export const MUTATION_FOLLOW_PARTNER_TOGGLE = `
  mutation followPartner($partnerId: ID) {
    partners {
      favoriting(findBy: {id: $partnerId}) {
        toggle {
          id
        }
      }
    }
  }
`;

export default client => {
  async function toggleFollow(partnerId) {
    const variables = { partnerId };
    return client
      .mutation(MUTATION_FOLLOW_PARTNER_TOGGLE, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) throw new Error(error);

        let results = false;

        if (data) {
          const { toggle: fav } = data.partners.favoriting;
          results = !!fav;
        }

        return results;
      });
  }

  return { toggleFollow };
};
