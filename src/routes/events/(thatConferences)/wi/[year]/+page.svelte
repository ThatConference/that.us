<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from './_components/Hero.svelte';
	import WhatIs from './_components/WhatIs.svelte';
	import What from './_components/What.svelte';
	import Gallery from './_components/Gallery.svelte';
	import CamperTickets from './_components/CamperTickets.svelte';

	let { event } = data;

	const metaTags = ((title = `${event.name} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${event.description} at THAT`,
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${event.slug}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<section>
		<Hero {event} />
	</section>

	<section>
		<WhatIs {event} />
	</section>

	<section id="tickets">
		<CamperTickets {event} />
	</section>

	<section>
		<What {event} />
	</section>

	<section>
		<Gallery />
	</section>
</div>
