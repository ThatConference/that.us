import * as Sentry from '@sentry/browser';

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
  function toggleFollow(partnerId) {
    const variables = { partnerId };
    return client
      .mutation(MUTATION_FOLLOW_PARTNER_TOGGLE, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) {
          Sentry.captureException(new Error(error), {
            tags: {
              api_that_tech: 'mutation_partners',
            },
          });
        }

        let results = false;

        if (data) {
          const { toggle } = data.partners.favoriting;
          results = !!toggle;
        }

        return results;
      });
  }

  return { toggleFollow };
};
