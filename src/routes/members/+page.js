import membersApi from '$dataSources/api.that.tech/members/queries';

export async function load({ fetch }) {
	const { queryMembers } = membersApi(fetch);

	return {
		members: await queryMembers()
	};
}
