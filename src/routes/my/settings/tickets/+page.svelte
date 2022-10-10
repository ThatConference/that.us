<script>
	export let data;

	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	dayjs.extend(isBetween);

	let { tickets = [] } = data;
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
		<h2 class="text-xl font-bold leading-6 text-gray-900">Event Tickets</h2>
	</header>

	<div class="mt-12">
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each tickets as t (t.id)}
				<li
					class="col-span-1 transform divide-y divide-gray-200 rounded-lg bg-white shadow hover:scale-105 hover:bg-gray-50">
					<a href="/activities/{t.event.slug}/">
						<div class="relative rounded-lg shadow-xl">
							{#if !dayjs().isAfter(dayjs(t.event.startDate), 'day')}
								<div
									class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
									aria-hidden="true" />
								<div class="absolute inset-x-0 top-0 translate-y-px transform">
									<div class="flex -translate-y-1/2 transform justify-center">
										<span
											class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white">
											UPCOMING
										</span>
									</div>
								</div>
							{:else if dayjs().isBetween(dayjs(t.event.startDate), dayjs(t.event.endDate))}
								<div
									class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
									aria-hidden="true" />
								<div class="absolute inset-x-0 top-0 translate-y-px transform">
									<div class="flex -translate-y-1/2 transform justify-center">
										<span
											class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white">
											In-Progress
										</span>
									</div>
								</div>
							{/if}
							<div class="px-4 py-8">
								<div class="flex w-full items-center justify-between space-x-6">
									<div class="flex-1 truncate">
										<div class="flex items-center space-x-3">
											<h3 class="text-md truncate font-medium text-gray-900">
												{t.event.name}
											</h3>
										</div>

										<p class="mt-1 truncate text-sm text-gray-500">
											{dayjs(t.event.startDate).format('dddd MMMM D, YYYY - h:mm A')}
										</p>

										<p class="mt-4 truncate text-sm text-gray-500">
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
