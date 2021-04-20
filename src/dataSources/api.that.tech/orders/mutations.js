import { log } from '../utilities/error';

export const MUTATION_CREATE_CHECKOUT_SESSION = `
  mutation createCheckoutSession($checkout: StripeCheckoutCreateInput!) {
    orders {
      me {
        checkout {
          stripe {
            create (checkout: $checkout)
          }
        }
      }
    }
  }
`;

export default client => {
  function createCheckoutSession(eventId, lineItems) {
    const variables = {
      checkout: {
        eventId,
        products: lineItems,
      },
    };

    return client
      .mutation(MUTATION_CREATE_CHECKOUT_SESSION, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'mutate_orders');

        let results;

        if (data) {
          const { checkout } = data.orders.me;
          results = checkout ? checkout.stripe.create : undefined;
        }

        return results;
      });
  }

  return { createCheckoutSession };
};
