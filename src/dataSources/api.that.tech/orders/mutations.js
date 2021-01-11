import { log } from '../utilities/error';

export const MUTATION_CREATE_CHECKOUT_SESSION = `
  mutation createCheckoutSession($checkout: CheckoutCreateInput!) {
    orders {
      me {
        create(checkout: $checkout)
      }
    }
  }
`;

export default client => {
  function createCheckoutSession() {
    const variables = {
      checkout: {
        lineItems: ['price_1HxQ4SBvVBgmhQW4k59jrXlh'], // todo, this will need to be passed in...
      },
    };

    return client
      .mutation(MUTATION_CREATE_CHECKOUT_SESSION, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'mutate_orders');

        let results;

        if (data) {
          const { create } = data.orders.me;
          results = create || undefined;
        }

        return results;
      });
  }

  return { createCheckoutSession };
};
