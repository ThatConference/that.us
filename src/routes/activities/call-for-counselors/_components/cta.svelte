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

<section class="py-12 lg:py-16 bg-thatBlue-700">
	<div
		class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex
      lg:items-center lg:justify-between"
	>
		<h2
			class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10"
		>
			Become a Camp Counselor today!
			<br />
			<span class="tracking-normal font-normal text-thatOrange-400 text-2xl">
				Submissions open through
				<span class="font-semibold">
					{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY z')}
				</span>
			</span>
		</h2>
		<div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
			<div class="inline-flex rounded-md shadow">
				<a
					href={`/activities/create#/event/${event.id}`}
					class="px-8 py-3 border-2 border-transparent text-base leading-6
            font-medium rounded-md shadow text-white bg-thatOrange-400
            hover:bg-thatOrange-500 focus:outline-none
            focus:border-thatOrange-700 focus:ring-that-orange
            transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
				>
					Get Started
				</a>
			</div>
		</div>
	</div>
</section>
