<script>
	export let event;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div
		class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:items-center
      lg:justify-between lg:px-8"
	>
		<h2
			class="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10"
		>
			Become a Camp Counselor today!
			<br />
			<span class="text-2xl font-normal tracking-normal text-thatOrange-400">
				Submissions open through
				<span class="font-semibold">
					{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY z')}
				</span>
			</span>
		</h2>
		<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
			<div class="inline-flex rounded-md shadow">
				<a
					href={`/activities/create/?event=${event.id}`}
					class="rounded-md border-2 border-transparent bg-thatOrange-400 px-8 py-3
            text-base font-medium leading-6 text-white shadow
            transition duration-150
            ease-in-out hover:bg-thatOrange-500
            focus:border-thatOrange-700 focus:outline-none focus:ring-that-orange md:py-4 md:px-10 md:text-lg"
				>
					Get Started
				</a>
			</div>
		</div>
	</div>
</section>
