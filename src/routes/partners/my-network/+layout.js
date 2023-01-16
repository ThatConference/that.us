import auth0 from '$utils/security/client';
import { sortBy } from 'lodash';

import partnerNetworkApi from '$dataSources/api.that.tech/partner/leads/queries';

export const load = auth0.withPageAuthRequired({
	load: async function load({ fetch }) {
		console.log('in load');
		const { queryMyNetwork } = partnerNetworkApi(fetch);

		const contacts = await queryMyNetwork()
			.then((c) => c.filter((c) => c !== null))
			.then((r) => sortBy(r, 'createdAt').reverse());

		return {
			contacts
		};
	}
});
