import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

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

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function toggleFollow(partnerId) {
		const variables = { partnerId };
		return client
			.mutation({ mutation: MUTATION_FOLLOW_PARTNER_TOGGLE, variables })
			.then(({ data, error }) => {
				if (error) log(error, 'mutate_partners');

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
