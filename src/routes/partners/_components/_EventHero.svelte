<script>
	export let event;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import Hero from '$elements/layouts/Hero.svelte';

	dayjs.extend(advancedFormat);

	const venue = event.venues[0];
</script>

<Hero imagePath="/images/heros/sponsor.jpg">
	<div class="flex max-w-3xl flex-col space-y-8 pb-36">
		<h2 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
			<span class="text-green-500">{`${venue.city}, ${venue.state}`}</span> / {dayjs(
				event.startDate
			).format('MMMM Do')} - {dayjs(event.endDate).format('Do, YYYY')}
		</h2>

		<div>
			<h1
				class="text-4xl font-extrabold uppercase text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
				Partners & Sponsors
			</h1>
		</div>

		<p class="text-xl tracking-tight text-white sm:text-3xl">
			Thank you for helping make all THAT possible. Learn more about what each has to offer.
		</p>

		<div class="flex pt-12">
			<a href="/sponsorships/apply/#prospectus">
				<div
					class="transform rounded-lg border-2 border-thatBlue-400 px-12 py-6 transition duration-500 ease-in-out hover:scale-105">
					<div class="flex items-center space-x-4">
						<p class="text-xl font-extrabold tracking-wider text-white antialiased">
							Sponsor Today
						</p>
					</div>
				</div>
			</a>
		</div>
	</div>
</Hero>
