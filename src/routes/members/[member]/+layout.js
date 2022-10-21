import memberQueryApi from '$dataSources/api.that.tech/members/queries';
import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ params, parent, fetch }) {
	const { queryMemberBySlug, queryFollowers } = memberQueryApi(fetch);
	const { queryMeFollowingMembers } = meQueryApi(fetch);

	let { user } = await parent();
	let { member } = params;

	function getQueries(member) {
		if (user.isAuthenticated) {
			return [queryMemberBySlug(member), queryFollowers(member), queryMeFollowingMembers()];
		} else {
			return [queryMemberBySlug(member), queryFollowers(member)];
		}
	}
	let queries = getQueries(member);

	let [profile, followers, myFollowers = []] = await Promise.all(queries);

	return {
		memberSlug: member,
		profile,
		followers,
		isFollowing: myFollowers.includes(profile.id)
	};
}
