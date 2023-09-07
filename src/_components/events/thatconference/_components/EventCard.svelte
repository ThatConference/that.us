<script>
	export let event;
	import { Action as ActionLink } from '$elements/links';

	import dayjs from 'dayjs';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';

	dayjs.extend(isSameOrAfter);
</script>

<div class="flex flex-col justify-center">
	<div class="relative py-3 sm:mx-auto sm:max-w-xl">
		<div
			class="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-that-orange to-that-red shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
		<div class="relative bg-white px-4 py-6 shadow-lg sm:rounded-3xl sm:p-14">
			<div class="mx-auto max-w-md">
				<div class="text-4xl font-bold uppercase text-thatBlue-700">
					<h1>
						{`${event.venues[0].city}, ${event.venues[0].state}`}
					</h1>
					<h2>Conference</h2>
				</div>

				<div class="font-extrabold text-that-red">
					{dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(event.endDate).format(
						'MMMM D, YYYY'
					)}
				</div>

				<div class="divide-y divide-gray-200">
					<div class="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
						<div>
							{event.description}
						</div>

						<div class="pt-2 text-base font-bold leading-6 sm:text-lg sm:leading-7">
							{#if dayjs().isSameOrAfter(dayjs(event.ticketsOnSaleFrom))}
								<p class="font-extrabold text-that-red">
									<a href={`/events/${event.slug}/tickets`} class="hover:text-thatBlue-500">
										Tickets on sale now!
									</a>
								</p>
							{:else}
								<p class="font-extrabold text-that-red">
									<a href={`/cfp`} class="hover:text-thatBlue-500"> Submit to Speak </a>
								</p>
							{/if}
							<p>
								<a href={`/events/${event.slug}/schedule`} class="hover:text-thatBlue-500">
									See the full schedule &rarr;
								</a>
							</p>
						</div>
					</div>

					<div class="flex flex-col justify-center pt-12">
						<ActionLink href={`/events/${event.slug}`}>Conference Details and Tickets</ActionLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
