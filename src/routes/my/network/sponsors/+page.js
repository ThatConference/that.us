import lodash from 'lodash';
import meNetworkQueryApi from '$dataSources/api.that.tech/me/network/queries';

const { sortBy } = lodash;

export async function load({ fetch }) {
	const { queryMySponsorNetwork } = meNetworkQueryApi(fetch);

	const contacts = await queryMySponsorNetwork().then((r) => sortBy(r, 'createdAt').reverse());

	return {
		contacts
	};
}
