import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

export const MUTATION_ADD_PIN = `
  mutation MUTATION_ADD_PIN($leadInput: PartnerLeadCreateInput!) {
    partners {
      us {
        leads {
          add (lead: $leadInput) {
            result
            message
          }
        }
      }
    }
  }
`;

export const MUTATION_ADD_LEAD = `
  mutation MUTATION_ADD_LEAD($eventId: ID!, $partnerId: ID, $membersNotes: String) {
    partners {
      me (findBy: {id: $partnerId }) {
        leads {
          add (lead: {eventId: $eventId, membersNotes: $membersNotes}) {
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

	function addPin(eventId, partnerPin, partnersNotes) {
		const variables = {
			leadInput: {
				eventId,
				partnerPin,
				partnersNotes
			}
		};

		return client.mutation({ mutation: MUTATION_ADD_PIN, variables }).then(({ data, error }) => {
			if (error) log(error, 'MUTATION_ADD_PIN');

			let results;

			if (data) {
				const { add } = data.partners.us.leads;
				results = add;
			}

			return results;
		});
	}

	function addLead(partnerId, eventId = '7wiuRWI7EZjcdF4e9MDz', membersNotes) {
		const variables = {
			partnerId,
			eventId,
			membersNotes
		};

		return client.mutation({ mutation: MUTATION_ADD_LEAD, variables }).then(({ data, error }) => {
			if (error) log(error, 'MUTATION_ADD_LEAD');

			let results;

			if (data) {
				const { add } = data.partners.me.leads;
				results = add;
			}

			return results;
		});
	}

	return { addPin, addLead };
};
