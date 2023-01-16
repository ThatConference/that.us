import auth0 from '$utils/security/client';
import lodash from 'lodash';

import partnerNetworkApi from '$dataSources/api.that.tech/partner/leads/queries';

const { sortBy } = lodash;

export const load = auth0.withPageAuthRequired({
	load: async function load({ fetch }) {
		const { queryMyNetwork } = partnerNetworkApi(fetch);

		const contacts = await queryMyNetwork()
			.then((c) => c.filter((c) => c !== null))
			.then((r) => sortBy(r, 'createdAt').reverse());

		return {
			contacts
		};
	}
});
