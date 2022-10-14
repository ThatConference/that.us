import communityQueryApi from '$dataSources/api.that.tech/community/queries';

export async function load({ params, fetch }) {
	const { community } = params;
	const { queryCommunityBySlug, queryCommunityFollowers, queryCommunityActivities } =
		communityQueryApi(fetch);

	const [communityDetails, communityFollowers, communityActivities] = await Promise.all([
		queryCommunityBySlug(community),
		queryCommunityFollowers(community),
		queryCommunityActivities({ slug: community })
	]);

	return {
		communityDetails,
		communityFollowers: communityFollowers.followers.members,
		communityActivities: communityActivities.sessions
	};
}
