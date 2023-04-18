<script>
	export let event;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import { Highlight as HighlightLink } from '$elements/links';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
</script>

<div class="bg-that-navy">
	<div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 ">
		<div class="lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
			<div class="col-span-5">
				<h3
					class="text-center text-4xl font-extrabold uppercase tracking-wide text-white sm:text-left">
					Call For Counselors is Open
				</h3>
			</div>

			<div class="col-span-3">
				<p class="text-xl leading-7 text-gray-300">
					Don't delay, call for counselors closes on

					<span class="pl:2 font-extrabold text-that-orange hover:text-thatOrange-500">
						{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY z')}
					</span>
				</p>

				<div class="pt-12">
					<HighlightLink href={`/call-for-counselors/${event.slug}/`}>Learn More</HighlightLink>
				</div>
			</div>

			<div class="col-span-2 hidden flex-col items-center lg:visible lg:flex">
				<img
					class="flip h-1/8 sm:absolute sm:h-2/3 sm:translate-y-24 sm:transform"
					src="/images/characters/bear-pig.png"
					alt />
			</div>
		</div>
	</div>
</div>

<style>
	.flip {
		transform: scaleX(-1);
	}
</style>
