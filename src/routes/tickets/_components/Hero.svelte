<script>
	export let event;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(advancedFormat);

	const venue = event.venues[0];
</script>

<div class="relative overflow-hidden ">
	<div class="backgroundImage bg-cover bg-center">
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6">
			<div class="space-y-24 lg:grid lg:grid-cols-7">
				<div class="col-span-5 py-36">
					<div class="flex flex-col items-center space-y-6 sm:items-start">
						<h1 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
							<span class="text-green-500">{`${venue.city}, ${venue.state}`}</span> / {dayjs(
								event.startDate
							).format('MMMM Do')} - {dayjs(event.endDate).format('Do, YYYY')}
						</h1>
						<p class="text-5xl font-extrabold leading-snug tracking-wider text-white antialiased">
							A four-day summer camp for developers passionate about learning all things mobile,
							web, cloud, and technology.
						</p>
						<div class="flex pt-12">
							<a href="tickets">
								<div
									class="transform rounded-lg border-2 border-thatBlue-400 py-6 px-12 transition duration-500 ease-in-out hover:scale-105">
									<div class="flex items-center space-x-4">
										<div class="col-span-3 flex flex-col items-center justify-center">
											<img
												class="lazyload h-12 w-auto"
												src="/images/faux-ticket-stub.svg"
												alt="THAT Robot Play Button" />
										</div>
										<div>
											<p class="text-xl font-extrabold tracking-wider text-white antialiased">
												Ticket Options
											</p>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="col-span-2 col-start-6 hidden place-self-end lg:block">
					<img class="flip h-96 w-auto pb-1" src="/images/characters/sassy.svg" alt="Sassy" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.backgroundImage {
		background-image: linear-gradient(rgba(31, 42, 99, 0.8), rgba(31, 42, 99, 0.8)),
			url('/images/event-highlight.jpg');
	}

	.flip {
		transform: scaleX(-1);
	}
</style>
