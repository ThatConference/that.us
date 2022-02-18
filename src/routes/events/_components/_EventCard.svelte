<script>
	export let event;

	import dayjs from 'dayjs';

	let location =
		event.venues[0].city.toLowerCase() === `internet`
			? 'Virtual, https://that.us'
			: `${event.venues[0].city}, ${event.venues[0].state}`;

	function getDisplayName(key) {
		let value = '';

		switch (key) {
			case 'THAT_US':
				value = 'daily on that';
				break;

			case 'MULTI_DAY':
				value = 'multi-day';
				break;

			case 'HYBRID_MULTI_DAY':
				value = 'hybrid multi-day';
				break;

			case 'ONLINE':
				value = 'online';
				break;

			default:
				break;
		}

		return value;
	}
</script>

<div class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg">
	<div class="flex-shrink-0 bg-gray-50 py-4">
		<img class="object-fit h-48 w-full py-4" src={event.logo || '/images/Trees-Solid.svg'} alt="" />
	</div>
	<div class="flex flex-1 flex-col justify-between bg-white p-6">
		<div class="flex-1">
			<p class="text-sm font-medium uppercase tracking-wider text-thatOrange-400">
				{getDisplayName(event.type)}
			</p>

			<p class="text-xl font-semibold text-gray-900">
				{event.name}
			</p>

			<p class="mt-3 text-base text-gray-500">
				{event.description}
			</p>
		</div>
		<div class="mt-6 flex items-center">
			<div>
				<p class="text-sm font-medium text-gray-900">
					{location}
				</p>

				<div class="flex space-x-1 text-sm text-gray-500">
					<time datetime="2020-03-16">
						{dayjs(event.startDate).format('MMMM D, YYYY')}
					</time>
					<span aria-hidden="true"> - </span>
					<time datetime="2020-03-16">
						{dayjs(event.endDate).format('MMMM D, YYYY')}
					</time>
				</div>
			</div>
		</div>
	</div>
</div>
