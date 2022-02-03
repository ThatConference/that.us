<script context="module">
	import lodash from 'lodash';
	import checkinQueryApi from '$dataSources/api.that.tech/checkin/queries';

	const { sortBy } = lodash;

	export async function load({ params, fetch }) {
		const { eventName, year } = params;
		const eventSlug = `${eventName}/${year}`;

		const { queryEventRegistrations } = checkinQueryApi(fetch);

		const registrations = await queryEventRegistrations(eventSlug).then((r) =>
			sortBy(r, 'member.lastName')
		);

		return {
			props: {
				registrations
			}
		};
	}
</script>

<script>
	export let registrations;

	import seoMetaTags from '$utils/seo/metaTags';
	import ProfileLayout from '$elements/layouts/Profile.svelte';
	import Seo from '$components/Seo.svelte';

	import RegistrationList from '../../_components/_RegistrationList.svelte';

	const metaTags = ((title = 'Event Checkin - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Upcoming and Past Events at THAT',
			openGraph: {
				type: 'website',
				url: 'https://that.us/'
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileLayout>
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl leading-9 font-extrabold text-thatBlue-800 tracking-tight sm:text-4xl">
					Event Registration
				</h2>
			</div>

			<RegistrationList {registrations} />
		</div>
	</div>
</ProfileLayout>
