<script context="module">
	import lodash from 'lodash';
	import ordersApi from '$dataSources/api.that.tech/orders/queries';

	const { sortBy } = lodash;

	export async function load({ fetch }) {
		const { queryMyTicketAllocations } = ordersApi(fetch);

		let tickets = await queryMyTicketAllocations().then((r) => {
			return sortBy(r, 'event.startDate').reverse();
		});

		return {
			props: {
				tickets
			}
		};
	}
</script>

<script>
	export let tickets = [];

	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	dayjs.extend(isBetween);

	const metaTags = ((title = 'My Event Tickets - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'View your event tickets.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/settings/tickets/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<header>
		<h2 class="text-xl leading-6 font-bold text-gray-900">Event Tickets</h2>
	</header>

	<div class="mt-12">
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each tickets as t (t.id)}
				<li
					class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 transform hover:scale-105 hover:bg-gray-50"
				>
					<a href="/activities/{t.event.slug}/">
						<div class="relative rounded-lg shadow-xl">
							{#if !dayjs().isAfter(dayjs(t.event.startDate), 'day')}
								<div
									class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
									aria-hidden="true"
								/>
								<div class="absolute inset-x-0 top-0 transform translate-y-px">
									<div class="flex justify-center transform -translate-y-1/2">
										<span
											class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white"
										>
											UPCOMING
										</span>
									</div>
								</div>
							{:else if dayjs().isBetween(dayjs(t.event.startDate), dayjs(t.event.endDate))}
								<div
									class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
									aria-hidden="true"
								/>
								<div class="absolute inset-x-0 top-0 transform translate-y-px">
									<div class="flex justify-center transform -translate-y-1/2">
										<span
											class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white"
										>
											In-Progress
										</span>
									</div>
								</div>
							{/if}
							<div class="px-4 py-8">
								<div class="w-full flex items-center justify-between space-x-6">
									<div class="flex-1 truncate">
										<div class="flex items-center space-x-3">
											<h3 class="text-gray-900 text-md font-medium truncate">
												{t.event.name}
											</h3>
										</div>

										<p class="mt-1 text-gray-500 text-sm truncate">
											{dayjs(t.event.startDate).format('dddd MMMM D, YYYY - h:mm A')}
										</p>

										<p class="mt-4 text-gray-500 text-sm truncate">
											Access: {t.product.name}
										</p>
									</div>
								</div>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
