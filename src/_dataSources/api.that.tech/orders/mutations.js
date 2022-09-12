import gFetch from '$utils/gfetch';
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
  mutation createCheckoutSession($eventId: ID!, $orderReference: String!) {
    orders {
      me {
        markQuestionsComplete(eventId: $eventId, orderReference: $orderReference)
      }
    }
  }
`;

export const MUTATION_ALLOCATE_TICKET = `
  mutation MUTATION_ALLOCATE_TICKET($orderId: ID!, $allocationId: ID!, $emailAddress: EmailAddress! ) {
    orders {
      me {
        order(orderId: $orderId) {
          orderAllocation(orderAllocationId: $allocationId) {
            allocateTo(email: $emailAddress ) {
              result
              message
              allocatedTo {
                ... on PrivateProfile {
									id
                  firstName
                  lastInitial
                }
                ... on PublicProfile {
									id
                  firstName
                  lastName
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MUTATION_CLAIM_TICKET = `
	mutation ClaimMySpot ($claim: ClaimOrderInput!) {
		orders {
			me {
				checkout {
					claim(claim: $claim) {
						result
						message
					}
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function createCheckoutSession(eventId, lineItems) {
		const variables = {
			checkout: {
				eventId,
				products: lineItems
			}
		};

		return client
			.mutation({ mutation: MUTATION_CREATE_CHECKOUT_SESSION, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_CREATE_CHECKOUT_SESSION' });

				let results;

				if (data) {
					const { checkout } = data.orders.me;
					results = checkout ? checkout.stripe.create : undefined;
				}

				return results;
			});
	}

	function markSurveyQuestionsCompleted(eventId, orderReference) {
		const variables = {
			eventId,
			orderReference
		};

		return client
			.mutation({ mutation: MUTATION_MARK_SURVEY_QUESTIONS_COMPLETED, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_MARK_SURVEY_QUESTIONS_COMPLETED' });

				let results;

				if (data) {
					const { markQuestionsComplete } = data.orders.me;
					results = markQuestionsComplete || false;
				}

				return results;
			});
	}

	function allocateTicket(orderId, allocationId, emailAddress) {
		const variables = {
			orderId,
			allocationId,
			emailAddress
		};

		return client
			.mutation({ mutation: MUTATION_ALLOCATE_TICKET, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_ALLOCATE_TICKET' });

				let results;

				if (data) {
					const { allocateTo } = data.orders.me.order.orderAllocation;
					results = allocateTo;
				}

				return results;
			});
	}

	function claimTicket(eventId, productId) {
		const variables = {
			claim: {
				eventId,
				productId
			}
		};

		return client
			.mutation({ mutation: MUTATION_CLAIM_TICKET, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_CLAIM_TICKET' });

				let results;

				if (data) {
					const { claim } = data.orders.me.checkout;
					results = claim;
				}

				return results;
			});
	}

	return {
		createCheckoutSession,
		markSurveyQuestionsCompleted,
		allocateTicket,
		claimTicket
	};
};
