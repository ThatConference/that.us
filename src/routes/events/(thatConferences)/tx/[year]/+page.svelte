<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import { Highlight as HighlightLink } from '$elements/links';

	import UpNextEvent from '$components/activities/UpNextEvent.svelte';
	import CallForSpeakers from '$components/cta/_CallForSpeakers.svelte';

	// event level
	import Speakers from '../../../_components/speakers/Speakers.svelte';

	//layout level
	import Partners from '../../_components/Partners.svelte';
	import FAQ from '../../_components/FAQ.svelte';
	import Dates from '../../_components/Dates.svelte';

	// component level
	import Gallery from './_components/Gallery.svelte';
	import Hero from './_components/Hero.svelte';
	import WhatIs from './_components/WhatIs.svelte';
	import What from './_components/What.svelte';
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

	{#if event.isCallForSpeakersOpen === true}
		<section id="upnext">
			<CallForSpeakers {event} />
		</section>
	{:else}
		<section>
			<Speakers {event} />
		</section>
		<section id="upnext">
			<UpNextEvent {event}>
				<div slot="action">
					<HighlightLink href={`/activities/${event.slug}`}>View the entire schedule</HighlightLink>
				</div>
			</UpNextEvent>
		</section>
	{/if}

	<!--dates-->
	<section>
		<Dates milestones={event.milestones} />
	</section>

	<section id="sponsors">
		<Partners {event} />
	</section>

	<section id="faq" />
	<FAQ />
</div>
