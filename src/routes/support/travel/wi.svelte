<script>
	import dayjs from 'dayjs';
	import { Standard as StandardLink } from '$elements/links';
	import { kalahari } from '$utils/config';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Layout from '../_components/_Layout.svelte';
	import Header from '../_components/_Header.svelte';
	import MemoryHighlight from '../_components/_MemoryHighlight.svelte';

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

	const open = dayjs(kalahari.passkey.wi.opens).format('dddd, MMMM D, YYYY');
	const close = dayjs(kalahari.passkey.wi.closes).format('dddd, MMMM D, YYYY');
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header pretext="THAT Campsite - Wisconsin">Travel and Lodging Information</Header>

	<section class="text-gray-500">
		<div
			class="relative 
              text-lg text-gray-500 leading-7 prose-lg
              max-w-prose lg:max-w-7xl  
              mx-auto lg:mx-0 mb-8 lg:pr-72"
		>
			<p>
				We have partnered with the Kalahari Resort and Staybridge Suites to offer the best group
				rates around the height of the summer vacation season.
			</p>
			<p class="mt-8">
				Discounted rates are available not only during our conference dates, but also a few days
				before and after the event in case you'd like to extend your stay.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
			<div class="px-12 bg-gray-50 bg-opacity-50 rounded-md shadow-md">
				<div class="prose prose-md text-gray-500">
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

						<h3>Booking Your Reservation</h3>
						<p>A dedicated website is now available for you to book your hotel room online.</p>

						<div class="flex justify-center">
							<StandardLink open={true} href={kalahari.passkey.wi.url}>Book Today</StandardLink>
						</div>
					</div>
				</div>
			</div>

			<div class="px-12 bg-gray-50 bg-opacity-50 rounded-md shadow-md">
				<div class="prose prose-md text-gray-500">
					<div class="flex flex-col pb-12">
						<h2>Staybridge Suites</h2>

						<p>
							A room block with discounted rates is now open at Staybridge Suites in Wisconsin Dells
							located directly across the street from the Kalahari AND within walking distance to
							the conference. <span class="font-semibold text-gray-800">Rates expire {close}</span>.
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
							Call toll free at 1-800-238-8000 and use block code <span
								class="font-semibold text-gray-800">TCO</span
							>. Or book online by using the dedicated website like below.
						</p>

						<div class="flex justify-center">
							<StandardLink
								open={true}
								href="https://www.staybridge.com/redirect?path=hd&brandCode=SB&localeCode=en&regionCode=1&hotelCode=MSNLD&_PMID=99801505&GPC=TCO&cn=no&viewfullsite=true"
								>Book Today</StandardLink
							>
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
							1305 Kalahari Drive<br />
							Wisconsin Dells, WI 53965<br />
						</blockquote>
					</div>

					<div class="prose prose-lg text-gray-500">
						<h2>From The Air</h2>

						<p>
							If you're coming from afar and need to fly there are three major airports to choose
							from.
						</p>

						<ul>
							<li>
								Madison Dane County Regional (MSN) is the closest airport at 50 minutes away from
								the Kalahari.
							</li>
							<li>Milwaukee Mitchell (MKE) is 1:51 hours away from the Kahalari.</li>
							<li>
								Chicago O'Hare (ORD) is the farthest away at 2:45 hrs from the Kalahari but it's all
								highway driving.
							</li>
						</ul>

						<p>
							Should I fly to MKE and take a puddle-jumper over to MSN? We don't recommend it as it
							might take you longer to deal with the layover rather than jumping in a car and
							driving to the Kalahari.
						</p>
						<p>
							Are there shuttles to the Kalahari from the airports? Unfortunately no but we suggest
							jumping in THAT Slack and ask if anyone is interested in ridesharing.
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
