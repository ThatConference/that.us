<script>
	export let event;

	import dayjs from 'dayjs';

	const venue = event.venues[0];
</script>

<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-5">
		<div class="col-span-2 flex flex-col justify-center sm:-mt-24">
			<a href="/events/{event.slug}/">
				<img class="h-72 w-full" src={event.logo} alt="" />
			</a>
		</div>

		<div class="col-span-3 text-center">
			<div class="p-8 ">
				<p class="text-3xl font-extrabold tracking-tight text-gray-500">
					{dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(event.endDate).format(
						'MMMM D, YYYY'
					)}
				</p>
				<p class="text-2xl font-semibold tracking-tight text-gray-500">
					{venue.name}
				</p>
				<p class="text-2xl font-semibold tracking-tight text-gray-500">
					{`${venue.city}, ${venue.state}, ${venue.zip}`}
				</p>
			</div>
		</div>
	</div>
</div>
