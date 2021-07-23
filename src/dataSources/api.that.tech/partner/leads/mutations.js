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

export default client => {
  function addPin(eventId, partnerPin, partnersNotes) {
    const variables = {
      leadInput: {
        eventId,
        partnerPin,
        partnersNotes,
      },
    };
    return client
      .mutation(MUTATION_ADD_PIN, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'MUTATION_ADD_PIN');

        let results;

        console.log({ data });

        if (data) {
          const { add } = data.partners.us.leads;
          results = add;
          console.log({ add });
        }

        return results;
      });
  }

  return { addPin };
};
