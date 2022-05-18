<script>
	export let event;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import { Ban } from '$elements/svgs';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	let hasAccessHover = false;
</script>

<div on:mouseenter={() => (hasAccessHover = true)} on:mouseleave={() => (hasAccessHover = false)}>
	{#if !hasAccessHover}
		<div
			class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-gray-50">
			<div class="flex-1 truncate px-4 py-2 text-sm text-gray-500">
				<p class="font-medium">
					{event.name}
				</p>

				<p>
					{dayjs(event.startDate).format('dddd, MMMM D, YYYY z')}
				</p>
			</div>
			<div class="flex-shrink-0 pr-4">
				<span class="flex h-6 w-6 items-center justify-center rounded-full">
					<Ban height="h-4" width="w-4" />
				</span>
			</div>
		</div>
	{:else}
		<a href={`/events/${event.slug}`}>
			<div
				class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-gray-50">
				<div class="flex-1 truncate px-4 py-2 text-sm text-gray-500">
					<p class="font-medium">A Ticket or Membership is Required</p>
					<p class="">View Event Details</p>
				</div>
				<div class="flex-shrink-0 pr-4">
					<span class="flex h-6 w-6 items-center justify-center rounded-full">
						<Ban height="h-4" width="w-4" />
					</span>
				</div>
			</div>
		</a>
	{/if}
</div>
