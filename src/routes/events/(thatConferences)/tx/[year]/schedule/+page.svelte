<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from '../../../../_components/schedule/Hero.svelte';
	import List from '../../../../_components/schedule/List.svelte';

	let { event, sessions } = data;

	const metaTags = ((title = 'THAT Conference Texas Speakers and Schedule.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'That Conference Texas Speakers and Schedule',
			openGraph: {
				type: 'website',
				url: `https://that.us/events/tx/${event.slug}/schedule`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<section class="mt-40">
		<Hero {event} days={['Monday', 'Tuesday', 'Wednesday', 'Thursday']} />
	</section>

	<section>
		<List event={sessions} />
	</section>
</div>
