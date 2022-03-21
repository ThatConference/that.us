<script lang="js">
	import lodash from 'lodash';
	const { pick } = lodash;
	export let speakers;
	export let title;
	export let showAllSpeakers = false;

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
	<section class="lg-py-16 bg-thatBlue-700 py-12">
		<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl">
					{title}
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					{#if showAllSpeakers}
						<span class="pl:2 text-that-orange hover:text-thatOrange-500"
							><a href="./speakers">entire speaker list (TODO).</a></span
						>
					{/if}
				</p>
			</div>

			<div class="mt-12">
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
		</div>
	</section>
{/if}
