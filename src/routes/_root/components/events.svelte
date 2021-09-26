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

<section class="py-12 lg:py-16 bg-white">
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<h1 class="text-4xl tracking-tight font-extrabold text-thatBlue-800 sm:text-5xl md:text-6xl">
			<span class="block text-center sm:text-left ">Activities Every Day,</span>
			<span class="block sm:pl-24 text-center sm:text-left sm:-mt-4 md:-mt-8 text-that-orange"
				>Events Every Month!</span
			>
		</h1>

		<div class="mt-12 space-y-12">
			<div class="w-full flex flex-col">
				<h2 class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
					<span class="pl-2 text-that-orange">Upcoming Online Events</span>
				</h2>
			</div>

			<ul
				class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-y-8
          lg:gap-x-12 lg:space-y-0"
			>
				{#each online as event}
					<li>
						<Event {event} />
					</li>
				{/each}
			</ul>

			<div class="w-full flex flex-col">
				<h2 class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
					<span class="pl-2 text-that-orange">Upcoming Hybrid Events</span>
				</h2>
			</div>
			<ul
				class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-y-8
          lg:gap-x-12 lg:space-y-0"
			>
				{#each hybrid as event}
					<li>
						<Event {event} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative pt-16 flex justify-end">
			<StandardLink href="/events">View All Our Past Events</StandardLink>
		</div>
	</div>
</section>
