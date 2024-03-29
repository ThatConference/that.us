// file needs to be page.server.js to ensure security fires in hooks.server.js handle
import lodash from 'lodash';

import partnerNetworkApi from '$dataSources/api.that.tech/partner/leads/queries';

const { sortBy } = lodash;

export async function load({ fetch }) {
	const { queryMyNetwork } = partnerNetworkApi(fetch);

	const contacts = await queryMyNetwork()
		.then((c) => c.filter((c) => c !== null))
		.then((r) => sortBy(r, 'createdAt').reverse());

	return {
		contacts
	};
}
