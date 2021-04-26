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

export const MUTATION_MARK_SURVEY_QUESTIONS_COMPLETED = `
  mutation createCheckoutSession($eventId: ID!) {
    orders {
      me {
        markQuestionsComplete(eventId: $eventId)
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

  function markSurveyQuestionsCompleted(eventId) {
    const variables = {
      eventId,
    };

    return client
      .mutation(MUTATION_MARK_SURVEY_QUESTIONS_COMPLETED, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'MUTATION_MARK_SURVEY_QUESTIONS_COMPLETED');

        let results;

        if (data) {
          const { markQuestionsComplete } = data.orders.me;
          results = markQuestionsComplete || false;
        }

        return results;
      });
  }

  return { createCheckoutSession, markSurveyQuestionsCompleted };
};
