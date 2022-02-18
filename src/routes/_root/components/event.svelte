<script>
	export let event;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	const { name, startDate, endDate, description, slug } = event;

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
</script>

<div class="bg-white">
	<a href="/events/{slug}/">
		<div
			class="relative transform rounded-lg shadow-xl transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-100"
		>
			<div
				class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatBlue-400"
				aria-hidden="true"
			/>
			<div class="absolute inset-x-0 top-0 translate-y-px transform">
				<div class="flex -translate-y-1/2 transform justify-center">
					<span
						class="inline-flex rounded-full bg-thatBlue-400 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white"
					>
						{dayjs(startDate).format('MMMM')}
					</span>
				</div>
			</div>

			<div class="px-4 py-8">
				<div class="px-4">
					<h3 class="text-md truncate font-bold text-gray-900">
						{name}
					</h3>
					<p class="truncate pt-2 text-sm text-gray-500">
						{dayjs(startDate).format('dddd, MMMM D, YYYY')} -
						{dayjs(endDate).format('dddd, MMMM D, YYYY')}
					</p>

					<p class="pt-4 text-sm text-gray-500">
						{description}
					</p>
				</div>
			</div>
		</div>
	</a>
</div>
