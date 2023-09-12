<script>
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';

	import { kalahari } from '$utils/config.public';
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Layout from '../../_components/_Layout.svelte';
	import Header from '../../_components/_Header.svelte';
	import MemoryHighlight from '../../_components/_MemoryHighlight.svelte';

	dayjs.extend(isBetween);

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

	const openTime = dayjs(kalahari.passkey.tx.opens);
	const open = openTime.format('dddd, MMMM D, YYYY');

	const closeTime = dayjs(kalahari.passkey.tx.closes);
	const close = closeTime.format('dddd, MMMM D, YYYY');

	const isRoomBlockOpen = dayjs().isBetween(openTime.subtract(1, 'day'), closeTime.add(1, 'day'));
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header pretext="THAT Campsite - Texas">Travel and Lodging Information</Header>

	<section class="text-gray-500">
		<div
			class="prose-md 
              relative mx-auto mb-8 max-w-prose
              text-lg leading-7  
              text-gray-500 lg:mx-0 lg:max-w-7xl lg:pr-72">
			<p>We have partnered with the Kalahari Resort to offer the best group rates around.</p>
			<p class="mt-8">
				Discounted rates are available not only during our conference dates, but a few additional
				days as well in case you'd like to extend your stay.
			</p>
		</div>

		<div class="flex flex-col items-center space-y-8 sm:space-x-8 sm:space-y-0">
			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose text-gray-500">
					<div class="flex-col pb-12">
						<h2>Kalahari Resorts and Convention Center</h2>
						<div>
							<p>
								Our room block opens <span class="font-semibold text-gray-800">{open}</span>, and
								will close
								<span class="font-semibold text-gray-800">{close}</span>
								or until the block is filled so reserve your room early!
							</p>
						</div>
						<div>
							<blockquote>
								Kalahari Resorts and Convention Center<br />
								3001 Kalahari Blvd<br />
								Round Rock, TX 78665<br />

								<a href="https://www.kalahariresorts.com/texas/"
									>https://www.kalahariresorts.com/texas/</a>
							</blockquote>
						</div>

						<h3>Room Types</h3>
						<div class="flex flex-col items-center space-x-4">
							<div class="prose-md prose w-2/4 rounded-md border bg-white p-4 shadow-md">
								<h4>Double Queen Sofa</h4>
								<p class="text-center">$198 + tax and fees</p>
							</div>
						</div>

						<!-- <div class="prose-md prose mt-4 text-gray-500">
							<p>Restrictions do apply:</p>
							<ul>
								<li>Speakers, this block isn't for you. Contact us.</li>
								<li>Never wait to book; when they're gone, they're gone.</li>
							</ul>
						</div> -->

						<h3>Speakers</h3>
						<p>
							This room block is not for you. Please use the link in the email you received or
							contact us.
						</p>

						<h3>Booking Your Reservation</h3>
						<p>
							A dedicated website is available for you to book your hotel room online or call
							1-877-525-2427.
						</p>

						{#if !isRoomBlockOpen}
							<p class="text-center text-red-500">Our room blocks are currently closed.</p>
						{/if}
						<div class="mt-8 flex flex-col items-center">
							<StandardLink open={true} href={kalahari.passkey.tx.url}>Book Today</StandardLink>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-24 text-lg leading-7 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
			<div class="relative mb-12 lg:mb-0">
				<div class="mb-10 flex flex-col justify-start">
					<div class="prose-md prose mb-10 text-gray-500">
						<h2>THAT Campsite</h2>

						<p>The Kalahari Resort and Convention Center can be located at:</p>

						<blockquote>
							Kalahari Resorts and Convention Center<br />
							3001 Kalahari Blvd<br />
							Round Rock, TX 78665<br />
						</blockquote>
					</div>
				</div>
			</div>
			<div class="relative mx-auto max-w-prose text-base lg:max-w-none">
				<MemoryHighlight imageSrc="/images/memories/hallway2_small.jpg" />
			</div>
		</div>

		<div class="flex flex-col space-y-8 pt-24 sm:flex-row sm:space-x-8 sm:space-y-0">
			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose my-10 text-gray-500">
					<h2>By Air</h2>

					<p>
						If you're coming from afar and need to fly then Austin–Bergstrom International Airport
						(AUS) is your destination. The Kalahari Resorts is located in Round Rock Texas which is
						roughly 35 minutes north of Austin–Bergstrom Airport.
					</p>

					<p>
						Are there shuttles to the Kalahari from the airports? Unfortunately no but we suggest
						jumping in THAT Slack and ask if anyone is interested in ride-sharing or catching an
						Uber/Lyft.
					</p>
				</div>
			</div>
		</div>
	</section>
</Layout>
