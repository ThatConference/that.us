<script>
	import lodash from 'lodash';
	const { flatten, uniqBy, pick } = lodash;
	export let event;
	export let max = 20;

	$: sessions = event && event.sessions && event.sessions.sessions;

	$: speakers = sessions
		? uniqBy(
				flatten(sessions.filter((s) => s && s.status === 'ACCEPTED').map((s) => s.speakers)).filter(
					(x) => x.profileSlug != 'thatconference'
				),
				(i) => i.id
		  ).slice(0, max)
		: [];

	import MemberCard from '$components/members/MemberCard.svelte';

	function filterMemberData(m) {
		return pick(m, [
			'firstName',
			'lastName',
			'jobTitle',
			'company',
			'profileImage',
			'profileSlug',
			'earnedMeritBadges',
			'profileLinks'
		]);
	}
</script>

{#if speakers.length > 0}
	<section class="py-12 lg-py-16 bg-thatBlue-700">
		<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl leading-9 font-extrabold text-white tracking-tight sm:text-4xl">
					Newly Added Speakers
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					<!-- <span class="pl:2 text-that-orange hover:text-thatOrange-500"
						><a href="/event/{event.slug}/speakers">entire speaker list (TODO).</a></span
					> -->
				</p>
			</div>

			<ul
				class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
								lg:grid-cols-5"
			>
				{#each speakers as s}
					<li class="col-span-1">
						<MemberCard {...filterMemberData(s)} />
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
