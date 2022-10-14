import communitiesApi from '$dataSources/api.that.tech/community/queries';

export async function load({ fetch }) {
	const { queryAllCommunities } = communitiesApi(fetch);

	return {
		communities: await queryAllCommunities()
	};
}
