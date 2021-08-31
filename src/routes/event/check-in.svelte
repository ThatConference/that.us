<script>
	import { page } from '$app/stores';
	import { sortBy } from 'lodash';
	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import ProfileLayout from '$elements/layouts/Profile.svelte';
	import checkinQueryApi from '$dataSources/api.that.tech/checkin/queries';

	import Loading from './_components/_Loading.svelte';
	import RegistrationList from './_components/_RegistrationList.svelte';

	const { eventName, year } = $page.params;
	const eventSlug = `${eventName}/${year}`;

	const metaTags = seoMetaTags({
		title: 'Event Checkin - THAT',
		description: 'Upcoming and Past Events at THAT',
		openGraph: {
			type: 'website',
			url: 'https://that.us/'
		}
	});

	const { queryEventRegistrations } = checkinQueryApi();

	function queryRegistrations() {
		return queryEventRegistrations(eventSlug).then((r) => sortBy(r, 'member.lastName'));
	}
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<ProfileLayout>
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl leading-9 font-extrabold text-thatBlue-800 tracking-tight sm:text-4xl">
					Event Registration
				</h2>
			</div>

			{#await queryRegistrations()}
				<div class="mt-12">
					<ul class="space-y-4">
						{#each [300, 600, 900, 1200] as i}
							<li
								in:fade={{ delay: i, duration: 2000 }}
								class="animate-pulse bg-gray-50 bg-opacity-75 shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
							>
								<Loading />
							</li>
						{/each}
					</ul>
				</div>
			{:then registrations}
				<RegistrationList {registrations} />
			{/await}
		</div>
	</div>
</ProfileLayout>
