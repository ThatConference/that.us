import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

export const MUTATION_CHECK_IN_USER = `
  mutation MUTATION_CHECK_IN_USER($eventId: ID!, $orderAllocationId: ID!, $pinNumber: String) {
    events {
      event(id: $eventId) {
        registration {
          checkInResult: checkin(orderAllocationId: $orderAllocationId, partnerPin: $pinNumber) {
            result
            message
            pinSet
          }
        }
      }
    }
  }
`;

export const MUTATION_REVERT_CHECKIN = `
  mutation MUTATION_REVERT_CHECKIN($eventId: ID!, $orderAllocationId: ID!) {
    events {
      event(id: $eventId) {
        registration {
          checkInResult: revertCheckin(orderAllocationId: $orderAllocationId) {
            result
            message
            pinSet
          }
        }
      }
    }
  }
`;

export const MUTATION_SET_PIN = `
  mutation MUTATION_SET_PIN($eventId: ID!, $orderAllocationId: ID!, $pinNumber: String!) {
    events {
      event(id: $eventId) {
        registration {
          checkInResult: setPartnerPin(orderAllocationId: $orderAllocationId, partnerPin: $pinNumber) {
            result
            message
            pinSet
          }
        }
      }
    }
  }
`;

export const MUTATION_SET_RECEIVED_SWAG = `
  mutation MUTATION_SET_RECEIVED_SWAG($eventId: ID!, $orderAllocationId: ID!, $receivedSwag: Boolean!) {
    events {
      event(id: $eventId) {
        registration {
          receivedResult: setReceivedSwag(orderAllocationId: $orderAllocationId, received: $receivedSwag) {
            result
            message
            pinSet
          }
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function checkIn(eventId, orderAllocationId, pinNumber) {
		const variables = { eventId, orderAllocationId, pinNumber };
		return client
			.mutation({ mutation: MUTATION_CHECK_IN_USER, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_CHECK_IN_USER' });

				let results;

				if (data) {
					const { checkInResult } = data.events.event.registration;
					results = checkInResult;
				}

				return results;
			});
	}

	function revertCheckIn(eventId, orderAllocationId) {
		const variables = { eventId, orderAllocationId };
		return client
			.mutation({ mutation: MUTATION_REVERT_CHECKIN, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_REVERT_CHECKIN' });

				let results;

				if (data) {
					const { checkInResult } = data.events.event.registration;
					results = checkInResult;
				}

				return results;
			});
	}

	function setPartnerPin(eventId, orderAllocationId, pinNumber) {
		const variables = { eventId, orderAllocationId, pinNumber };
		return client.mutation({ mutation: MUTATION_SET_PIN, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'MUTATION_SET_PIN' });

			let results;

			if (data) {
				const { checkInResult } = data.events.event.registration;
				results = checkInResult;
			}

			return results;
		});
	}

	function setReceivedSwag(eventId, orderAllocationId, receivedSwag) {
		const variables = { eventId, orderAllocationId, receivedSwag };
		return client
			.mutation({ mutation: MUTATION_SET_RECEIVED_SWAG, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_SET_RECEIVED_SWAG' });

				let results;

				if (data) {
					const { receivedResult } = data.events.event.registration;
					results = receivedResult;
				}

				return results;
			});
	}

	return { checkIn, revertCheckIn, setPartnerPin, setReceivedSwag };
};
