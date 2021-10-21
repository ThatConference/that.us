<script>
	export let event;

	import dayjs from 'dayjs';
	import { scrollto } from 'svelte-scrollto';

	import { Shell } from '$elements/buttons';

	const venue = event.venues[0];
</script>

<div class="relative bg-thatBlue-200 bg-opacity-25">
	<div class="max-w-5xl mx-auto w-full pt-10 pb-10 px-6">
		<div class="flex flex-col sm:flex-row sm:justify-around items-center">
			<div class="flex flex-col space-y-4">
				<h1
					class="font-extrabold uppercase text-thatBlue-500 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
				>
					Event Tickets
				</h1>

				<div class="font-extrabold">
					<p class="text-3xl tracking-tight text-gray-500">
						{dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(event.endDate).format(
							'MMMM D, YYYY'
						)}
					</p>
				</div>

				<div class="font-semibold text-gray-500">
					<div>
						{venue.name}
					</div>
					<div>
						{venue.address}
					</div>
					<div>
						{`${venue.city}, ${venue.state}, ${venue.zip}`}
					</div>

					<p class="text-3xl tracking-tight text-gray-500" />
				</div>
			</div>

			<div class="mt-12 sm:mt-0">
				<a href={`/events/${event.slug}`} class="w-full">
					<img class="h-48 sm:h-96 " src={event.logo} alt="" />
				</a>
			</div>
		</div>

		<div class="relative mt-24 p-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
			<div class="flex-1 rounded-md shadow">
				<a use:scrollto={'#professionals'}>
					<Shell>
						<div class="px-4 py-2 font-extrabold uppercase">Professionals</div>
					</Shell>
				</a>
			</div>
			<div class="flex-1 rounded-md shadow">
				<a use:scrollto={'#workshops'}>
					<Shell>
						<div class="px-4 py-2 font-extrabold uppercase">Workshops</div>
					</Shell>
				</a>
			</div>
			<div class="flex-1 rounded-md shadow">
				<a use:scrollto={'#families'}>
					<Shell>
						<div class="px-4 py-2 font-extrabold uppercase">Families</div>
					</Shell>
				</a>
			</div>
		</div>

		<div class="p-10 text-gray-500 flex justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="animate-bounce h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
			</svg>
		</div>
	</div>
</div>
