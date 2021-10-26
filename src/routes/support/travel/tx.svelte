<script>
	import { kalahari } from '$utils/config';
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Layout from '../_components/_Layout.svelte';
	import Header from '../_components/_Header.svelte';
	import MemoryHighlight from '../_components/_MemoryHighlight.svelte';

	const metaTags = ((title = 'Texas Travel Information - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/travel/tx/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header pretext="THAT Campsite - Texas">Travel and Lodging Information</Header>

	<section class="text-gray-500">
		<div
			class="relative 
              text-lg text-gray-500 leading-7 prose-lg
              max-w-prose lg:max-w-7xl  
              mx-auto lg:mx-0 mb-8 lg:pr-72"
		>
			<p>We have partnered with the Kalahari Resort to offer the best group rates around.</p>
			<p class="mt-8">
				Discounted rates are available not only during our conference dates, but also a few days
				before and after the event in case you'd like to extend your stay.
			</p>
		</div>

		<div class="flex flex-col items-center sm:space-x-8 space-y-8 sm:space-y-0">
			<div class="px-12 bg-gray-50 bg-opacity-50 rounded-md shadow-md">
				<div class="prose prose-md text-gray-500">
					<div class="flex-col pb-12">
						<h2>Kalahari Resorts and Convention Center</h2>
						<div>
							<p>
								Our room block opens <span class="font-semibold text-gray-800"
									>October 25th, 2021</span
								>, and will close
								<span class="font-semibold text-gray-800">December 31st, 2021</span>
								or until the block is filled so reserve your room early!
							</p>
						</div>
						<div>
							<blockquote>
								Kalahari Resorts and Convention Center<br />
								3001 Kalahari Blvd<br />
								Round Rock, TX 78665<br />

								<a href="https://www.kalahariresorts.com/texas/"
									>https://www.kalahariresorts.com/texas/</a
								>
							</blockquote>
						</div>

						<h3>Booking Your Reservation</h3>
						<p>
							A dedicated website is available for you to book your hotel room online or call
							1-877-525-2427.
						</p>

						<div class="mt-8 flex flex-col items-center">
							<StandardLink open={true} href={kalahari.passkey.tx}>Book Today</StandardLink>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start text-lg leading-7">
			<div class="relative mb-12 lg:mb-0">
				<div class="mb-10 flex flex-col justify-start">
					<div class="mb-10 prose prose-lg text-gray-500">
						<h2>THAT Campsite</h2>

						<p>The Kalahari Resort and Convention Center can be located at:</p>

						<blockquote>
							Kalahari Resorts and Convention Center<br />
							3001 Kalahari Blvd<br />
							Round Rock, TX 78665<br />
						</blockquote>
					</div>

					<div class="prose prose-lg text-gray-500">
						<h2>From The Air</h2>

						<p>
							If you're coming from afar and need to fly then Austin–Bergstrom International Airport
							(AUS) is your destination. The Kalahari Resorts is located in Round Rock Texas which
							is roughly 35 minutes north of Austin–Bergstrom Airport.
						</p>

						<p>
							Are there shuttles to the Kalahari from the airports? Unfortunately no but we suggest
							jumping in THAT Slack and ask if anyone is interested in ridesharing or catching an
							Uber/Lyft.
						</p>
					</div>
				</div>
			</div>
			<div class="relative text-base max-w-prose mx-auto lg:max-w-none">
				<MemoryHighlight imageSrc="/images/memories/hallway2_small.jpg" />
			</div>
		</div>
	</section>
</Layout>
