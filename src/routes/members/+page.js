import membersApi from '$dataSources/api.that.tech/members/queries';

export async function load() {
	const { queryMembers } = membersApi();

	return {
		members: await queryMembers()
	};
}
