<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import ProfileLayout from '$elements/layouts/Profile.svelte';
	import Seo from '$components/Seo.svelte';

	import RegistrationList from '../../_components/_RegistrationList.svelte';

	let { registrations } = data;
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
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-thatBlue-800 sm:text-4xl">
					Event Registration
				</h2>
			</div>

			<RegistrationList {registrations} />
		</div>
	</div>
</ProfileLayout>
