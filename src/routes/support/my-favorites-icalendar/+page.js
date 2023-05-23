export async function load({ parent }) {
	const { user } = await parent();

	return {
		profile: user?.profile
	};
}
