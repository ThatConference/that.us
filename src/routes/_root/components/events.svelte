<script>
	export let events = [];

	import lodash from 'lodash';
	import dayjs from 'dayjs';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';

	import { Standard as StandardLink } from '$elements/links';

	import { Event } from './';

	dayjs.extend(isSameOrBefore);
	const { sortBy } = lodash;

	let online = sortBy(
		events
			.filter((i) => i.type === 'ONLINE')
			.filter((i) => i.isActive)
			// .filter(i => i.isFeatured)
			.filter((i) => dayjs().isSameOrBefore(i.endDate, 'day')),
		'endDate'
	);

	let hybrid = sortBy(
		events
			.filter((i) => i.type === 'MULTI_DAY' || i.type === 'HYBRID_MULTI_DAY')
			.filter((i) => i.isActive)
			// .filter(i => i.isFeatured)
			.filter((i) => dayjs().isSameOrBefore(i.endDate, 'day')),
		'endDate'
	);
</script>

<section class="bg-white py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<h1
			class="text-2xl font-extrabold uppercase text-thatBlue-700 antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
			Upcoming Events
		</h1>

		<div class="mt-12 space-y-12">
			<div class="flex w-full flex-col">
				<h2 class="text-3xl font-semibold leading-9 tracking-tight sm:text-4xl">
					<span class="pl-2 text-that-orange">THAT Conferences</span>
				</h2>
			</div>
			<ul
				class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12
					lg:gap-y-8 lg:space-y-0">
				{#each hybrid as event}
					<li>
						<Event {event} />
					</li>
				{/each}
			</ul>
			<div class="flex w-full flex-col">
				<h2 class="text-3xl font-semibold leading-9 tracking-tight sm:text-4xl">
					<span class="pl-2 text-that-orange">Virtual Events</span>
				</h2>
			</div>

			<ul
				class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12
          lg:gap-y-8 lg:space-y-0">
				{#each online as event}
					<li>
						<Event {event} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative flex justify-end pt-16">
			<StandardLink href="/events/">View our Past Events</StandardLink>
		</div>
	</div>
</section>
