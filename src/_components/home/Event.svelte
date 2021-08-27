<script>
	export let name;
	export let startDate;
	export let endDate;
	export let description;
	export let slug;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(advancedFormat);
</script>

<div class="bg-white">
	<a href="/events/{slug}">
		<div
			class="relative rounded-lg shadow-xl transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gray-100"
		>
			<div
				class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatBlue-400"
				aria-hidden="true"
			/>
			<div class="absolute inset-x-0 top-0 transform translate-y-px">
				<div class="flex justify-center transform -translate-y-1/2">
					<span
						class="inline-flex rounded-full bg-thatBlue-400 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white"
					>
						{dayjs(startDate).format('MMMM')}
					</span>
				</div>
			</div>

			<div class="px-4 py-8">
				<div class="px-4">
					<h3 class="text-gray-900 text-md font-bold truncate">
						{name}
					</h3>

					<p class="pt-2 text-gray-500 text-sm truncate">
						{dayjs(startDate).format('dddd, MMMM D, YYYY - h:mm A z')}
						{dayjs(endDate).format('dddd, MMMM D, YYYY - h:mm A z')}
					</p>

					<p class="pt-4 text-gray-500 text-sm">
						{description}
					</p>
				</div>
			</div>
		</div>
	</a>
</div>
