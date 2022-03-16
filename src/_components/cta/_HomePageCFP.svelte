<script>
	export let event;

	import dayjs from 'dayjs';
</script>

<div class="flex flex-col justify-center">
	<div class="relative py-3 sm:mx-auto sm:max-w-xl">
		<div
			class="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-that-orange to-that-red shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
		<div class="relative bg-white px-4 py-6 shadow-lg sm:rounded-3xl sm:p-14">
			<div class="mx-auto max-w-md">
				<a href={`/events/${event.slug}`}>
					<div
						class="flex transform flex-col justify-center transition duration-500 ease-in-out hover:scale-105">
						<img src={event.logo} class="h-24" alt="THAT Confernece Logo" />
					</div>
				</a>

				<div class="divide-y divide-gray-200">
					<div class="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
						<div>
							<span class="font-extrabold text-that-orange">Call For Counselors is Now Open.</span>
							Don't delay as submissions close on
							<span>
								{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY')}
							</span>
						</div>

						<div class="space-y-2 text-center">
							<div class="p-8 ">
								<p class="text-xl font-extrabold tracking-tight text-gray-500">
									{dayjs(event.startDate).format('MMM D, YYYY')} - {dayjs(event.endDate).format(
										'MMM D, YYYY'
									)}
								</p>
								<p class="text-lg font-semibold tracking-tight text-gray-500">
									{event.venues[0].name}
								</p>
								<p class="text-lg font-semibold tracking-tight text-gray-500">
									{`${event.venues[0].city}, ${event.venues[0].state}, ${event.venues[0].zip}`}
								</p>
							</div>
						</div>

						<p>
							We are searching for hour-long sessions, half and full-day workshops, and keynotes
							that bring value to our community.
						</p>
					</div>
					<div class="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
						<p>Become a Counselor</p>
						<p>
							<a
								href={`/call-for-counselors/${event.slug}/`}
								class="text-that-orange hover:text-thatOrange-500">
								Learn More &rarr;
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
