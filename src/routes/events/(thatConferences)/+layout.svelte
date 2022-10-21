<script>
	export let data;

	import { fade } from 'svelte/transition';

	import { Trees } from '$elements/svgs';
	import Footer from '$components/footer/Footer.svelte';
	import Nav from './_components/nav/Nav.svelte';

	let { event } = data;
	const [venue] = event.venues;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.name,
		startDate: event.startDate,
		endDate: event.endDate,
		eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: [
			{
				'@type': 'Place',
				name: venue.name,
				address: {
					'@type': 'PostalAddress',
					streetAddress: venue.address,
					addressLocality: event.city,
					postalCode: venue.zip,
					addressRegion: venue.state,
					addressCountry: 'US'
				}
			}
		],
		image: [event.logo],
		description: event.description,
		organizer: {
			'@type': 'Organization',
			name: 'THAT Conference',
			url: 'https://that.us'
		}
	};
</script>

<div class="bg-thatBlue-100 bg-opacity-25">
	<div class="flex min-h-screen flex-col bg-gray-50">
		<div class="z-50">
			<Nav {event} />
		</div>

		<div class="hidden lg:inset-y-0 lg:block lg:h-full lg:w-full">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<Trees
					classes="z-0 opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100" />
			</div>
		</div>

		<main class="flex-grow">
			<slot />
		</main>

		<Footer />
	</div>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
