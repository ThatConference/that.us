import membersApi from '$dataSources/api.that.tech/members/queries';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import statsApi from '$dataSources/api.that.tech/stats/queries';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import communityQueryApi from '$dataSources/api.that.tech/community/queries';

//blog
import { getPosts } from '$blog/getPosts';

export async function load() {
	const { queryActiveThatEvents } = communityQueryApi();
	const { queryMembers, queryBlogAuthorBySlug } = membersApi();
	const { queryEventsByCommunity } = eventsApi();
	const { queryCommunityStats } = statsApi();
	const { querySessionsByDate } = sessionsApi();

	const rawPosts = getPosts({ limit: 6 });

	// todo - some of these graph calls could be combined.
	// todo - we could pick off the cfp from the event already queried.
	// todo - "up next event" should come from somewhere.

	const [members, events, stats, thatActiveEvents, activitiesUpNext, blogPosts] = await Promise.all(
		[
			queryMembers(15),
			queryEventsByCommunity(),
			queryCommunityStats(),
			queryActiveThatEvents(),
			querySessionsByDate({ pageSize: 6 }),
			Promise.all(
				rawPosts.map(async (p) => {
					const author = await queryBlogAuthorBySlug(p.metadata.authorSlug);

					return {
						...p,
						metadata: {
							...p.metadata,
							author
						}
					};
				})
			)
		]
	);

	const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		members: members.members,
		events,
		stats,
		thatActiveEvents: filteredEvents,
		activitiesUpNext,
		blogPosts
	};
}
