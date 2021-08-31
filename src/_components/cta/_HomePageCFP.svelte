<script>
	import dayjs from 'dayjs';

	import gFetch from '$utils/gfetch';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	function queryEvent() {
		return eventsApi(gFetch()).queryEventForCfp('tx/2022');
	}
</script>

{#await queryEvent() then event}
	<div class="flex flex-col justify-center">
		<div class="relative py-3 sm:max-w-xl sm:mx-auto">
			<div
				class="absolute inset-0 bg-gradient-to-r from-that-orange to-that-red shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
			/>
			<div class="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-14">
				<div class="max-w-md mx-auto">
					<a href={`/events/${event.slug}`}>
						<div
							class="flex flex-col justify-center transition duration-500 ease-in-out transform hover:scale-105"
						>
							<img src={event.logo} class="h-24" alt="THAT Confernece Logo" />
						</div>
					</a>

					<div class="divide-y divide-gray-200">
						<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
							<div>
								<span class="font-extrabold text-that-orange">Call For Counselors is Now Open.</span
								>
								Don't delay as submissions close on
								<span>
									{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY')}
								</span>
							</div>

							<div class="space-y-2 text-center">
								<div class="p-8 ">
									<p class="font-extrabold text-xl tracking-tight text-gray-500">
										{dayjs(event.startDate).format('MMM D, YYYY')} - {dayjs(event.endDate).format(
											'MMM D, YYYY'
										)}
									</p>
									<p class="font-semibold text-lg tracking-tight text-gray-500">
										{event.venues[0].name}
									</p>
									<p class="font-semibold text-lg tracking-tight text-gray-500">
										{`${event.venues[0].city}, ${event.venues[0].state}, ${event.venues[0].zip}`}
									</p>
								</div>
							</div>

							<p>
								We are searching for hour-long sessions, half and full-day workshops, and keynotes
								that bring value to our community.
							</p>
						</div>
						<div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
							<p>Become a Counselor</p>
							<p>
								<a
									href={`/activities/call-for-counselors/${event.slug}`}
									class="text-that-orange hover:text-thatOrange-500"
								>
									Learn More &rarr;
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}
