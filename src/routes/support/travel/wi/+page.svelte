<script>
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';

	import { Standard as StandardLink } from '$elements/links';
	import { kalahari } from '$utils/config.public';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Layout from '../../_components/_Layout.svelte';
	import Header from '../../_components/_Header.svelte';
	import MemoryHighlight from '../../_components/_MemoryHighlight.svelte';

	dayjs.extend(isBetween);

	const metaTags = ((title = 'Wisconsin Travel Information - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/travel/wi/`
			}
		})
	}))();

	const openTime = dayjs(kalahari.passkey.wi.opens);
	const open = openTime.format('dddd, MMMM D, YYYY');

	const closeTime = dayjs(kalahari.passkey.wi.closes);
	const close = closeTime.format('dddd, MMMM D, YYYY');

	const isRoomBlockOpen = dayjs().isBetween(openTime.subtract(1, 'day'), closeTime.add(1, 'day'));
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header pretext="THAT Campsite - Wisconsin">Travel and Lodging Information</Header>

	<section class="text-gray-500">
		<div
			class="prose-md 
              relative mx-auto mb-8 max-w-prose
              text-lg leading-7  
              text-gray-500 lg:mx-0 lg:max-w-7xl lg:pr-72">
			<p>
				We have partnered with the Kalahari Resort and Staybridge Suites to offer the best group
				rates around the height of the summer vacation season.
			</p>
			<p class="mt-8">
				Discounted rates are available not only during our conference dates, but also a few days
				before and after the event in case you'd like to extend your stay.
			</p>
		</div>

		<div class="flex flex-col space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
			<!-- <div class="flex flex-col items-center space-y-8 sm:space-x-8 sm:space-y-0"> -->
			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose text-gray-500">
					<div class="flex flex-col pb-12">
						<h2>Kalahari Resorts and Convention Center</h2>

						<p>
							Our room block opens <span class="font-semibold text-gray-800">{open}</span>, and will
							close
							<span class="font-semibold text-gray-800">{close}</span>
							or until the block is filled so reserve your room early!
						</p>

						<div>
							<blockquote>
								Kalahari Resorts and Convention Center<br />
								1305 Kalahari Drive<br />
								Wisconsin Dells, WI 53965<br />
							</blockquote>
						</div>

						<h3>Room Types</h3>
						<div class="flex space-x-4">
							<div class="prose-md prose w-full rounded-md border bg-white p-4 shadow-md">
								<h4>Double Queen Sofa</h4>
								<p class="text-center">$200 + tax and fees</p>
							</div>

							<div class="prose-md prose w-full rounded-md border bg-white p-4 shadow-md ">
								<h4>2 Bedroom Suite</h4>
								<p class="text-center">$324 + tax and fees</p>
							</div>
						</div>

						<div class="prose-md prose mt-4 text-gray-500">
							<p>Restrictions do apply:</p>
							<ul>
								<li>Speakers, this block isn't for you. Contact us.</li>
								<li>Weekend rates may be different than listed above.</li>
								<li>Our block discount does apply to all rooms, not just the two listed above.</li>
								<li>Never wait to book; when they're gone, they're gone.</li>
							</ul>
						</div>

						<h3>Booking Your Reservation</h3>
						<p>A dedicated website is now available for you to book your hotel room online.</p>

						{#if !isRoomBlockOpen}
							<p class="text-red-500">
								Please note that our block discounts have ended, but you can still book your stay at
								the Kalahari.
							</p>
						{/if}

						<div class="flex justify-center">
							<StandardLink open={true} href={kalahari.passkey.wi.url}>Book Today</StandardLink>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose text-gray-500">
					<div class="flex flex-col pb-12">
						<h2>Staybridge Suites</h2>

						<p>
							A room block with discounted rates is now open at Staybridge Suites in Wisconsin Dells
							located directly across the street from the Kalahari AND within walking distance to
							the conference. <span class="font-semibold text-gray-800"
								>Rates expire on 6/24/2022</span
							>.
						</p>
						<div>
							<blockquote>
								Staybridge Suites Wisconsin Dells<br />
								1345 Great Wolf Drive<br />
								Lake Delton, WI 53940<br />
							</blockquote>
						</div>

						<h3>Booking Your Reservation</h3>
						<p>
							Call toll free at 1-800-496-7630 and use block code <span
								class="font-semibold text-gray-800">KTC</span
							>. Or book online by using the dedicated website link below.
						</p>

						<div class="flex justify-center">
							<StandardLink open={true} href="https://www.staybridge.com/">Book Today</StandardLink>
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
							1305 Kalahari Drive<br />
							Wisconsin Dells, WI 53965<br />
						</blockquote>
					</div>
				</div>
			</div>

			<div class="relative mx-auto max-w-prose text-base lg:max-w-none">
				<MemoryHighlight imageSrc="/images/memories/hallway2_small.jpg" />
			</div>
		</div>

		<div class=" flex flex-col space-y-8 pt-24 sm:flex-row sm:space-x-8 sm:space-y-0">
			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose my-10 text-gray-500">
					<h2>By Air</h2>

					<p>
						If you're coming from afar and need to fly there are three major airports to choose
						from.
					</p>

					<ul>
						<li>
							Madison Dane County Regional (MSN) is the closest airport at 50 minutes away from the
							Kalahari.
						</li>
						<li>Milwaukee Mitchell (MKE) is 1:51 hours away from the Kahalari.</li>
						<li>
							Chicago O'Hare (ORD) is the farthest away at 2:45 hrs from the Kalahari but it's all
							highway driving.
						</li>
					</ul>

					<p>
						Should I fly to MKE and take a puddle-jumper over to MSN? We don't recommend it as it
						might take you longer to deal with the layover rather than jumping in a car and driving
						to the Kalahari.
					</p>
					<p>
						Are there shuttles to the Kalahari from the airports? Unfortunately no but we suggest
						jumping in THAT Slack and ask if anyone is interested in ridesharing.
					</p>
				</div>
			</div>

			<div class="rounded-md bg-gray-100 px-12 shadow-md">
				<div class="prose-md prose my-10 text-gray-500">
					<h2>By Rail</h2>

					<p>
						There is an Amtrak station in Wisconsin Dells as another travel option. Check the <a
							href="https://www.amtrak.com/stations/wdl"
							target="_blank"
							rel="external noopener noreferrer">Amtrak</a> website for train schedule and pricing.
					</p>
					<blockquote>
						Wisconsin Dells (WDL)<br />
						100 LaCrosse Street<br />
						Wisconsin Dells, WI 53965<br />
						Station Building (with waiting room)
					</blockquote>
					<p>
						Are there shuttles to the Kalahari from the train station? Unfortunately no, but
						fortunately it's a short taxi/Uber/Lyft ride to the Kalahari. Also try jumping in THAT
						Slack and ask if anyone is interested in ridesharing or available for a ride.
					</p>
				</div>
			</div>
		</div>
	</section>
</Layout>
