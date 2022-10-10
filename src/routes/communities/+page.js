import communitiesApi from '$dataSources/api.that.tech/community/queries';

export async function load() {
	const { queryAllCommunities } = communitiesApi();

	return {
		communities: await queryAllCommunities()
	};
}
