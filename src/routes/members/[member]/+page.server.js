import memberQueryApi from '$dataSources/api.that.tech/members/queries';
import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ params, parent }) {
	const { queryMemberBySlug, queryFollowers } = memberQueryApi();
	const { queryMeFollowingMembers } = meQueryApi();

	let { member } = params;
	let { user } = await parent();

	let [profile, followers, myFollowers = []] = await (async () => {
		if (user.isAuthenticated) {
			return await Promise.all([
				queryMemberBySlug(member),
				queryFollowers(member),
				queryMeFollowingMembers()
			]);
		} else {
			return await Promise.all([queryMemberBySlug(member), queryFollowers(member)]);
		}
	})();

	return {
		memberSlug: member,
		profile,
		followers,
		isFollowing: myFollowers.includes(profile.id)
	};
}
