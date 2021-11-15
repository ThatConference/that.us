<script>
	export let eventDetails;

	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';
	import Checkbox from 'svelte-checkbox';

	import { Shell } from '$elements/buttons';
	import { kalahari } from '$utils/config';

	const dispatch = createEventDispatcher();
	const [venue] = eventDetails.venues;

	const startDate = kalahari.speakerPasskey[eventDetails.slug].start;
	const endDate = kalahari.speakerPasskey[eventDetails.slug].end;
	const blockCloseDate = kalahari.speakerPasskey[eventDetails.slug].blockCloseDate;

	let declinedRoomComp = false;

	function handleSubmit() {
		dispatch('submit-step', { eventSlug: eventDetails.slug, declinedRoomComp });
	}
</script>

<div class="space-y-4">
	<slot name="header" />

	<div class="pt-6">
		<div class="mt-4 flex flex-col space-y-4 ">
			<div class="prose prose-lg">
				<span class="font-semibold">{venue.name}</span><br />
				<span>{venue.address}</span><br />
				<span>{venue.city}, {venue.state} {venue.zip}</span>
			</div>
			<div>
				<a class="hover" href="https://www.kalahariresorts.com/">https://www.kalahariresorts.com</a>
			</div>
		</div>
	</div>
</div>

<div class="mt-12">
	<h2 class="text-xl text-gray-800 font-extrabold">
		Book Your Hotel Room at The Kalahari. Like Right Now!
	</h2>
	<p class="mt-4 prose prose-lg text-gray-500">
		We have secured discounted room rates at The Kalahari from <span class="font-extrabold"
			>{dayjs(startDate).format('dddd, MMMM D, YYYY')}</span
		>
		through <span class="font-extrabold">{dayjs(endDate).format('dddd, MMMM D, YYYY')}</span>.
		Reserve your room starting
		<span class="font-extrabold uppercase">now</span>
		by heading over to the counselor's Kalahari registration link at

		<a class="hover" href={kalahari.speakerPasskey[eventDetails.slug].bookingUrl}>
			{kalahari.speakerPasskey[eventDetails.slug].bookingUrl}
		</a>

		to receive the discounted block rate on a standard room.
	</p>
</div>

<div class="mt-12">
	<p class="prose prose-lg text-gray-500">
		<span class="font-extrabold">Did we mention don't delay? DON'T DELAY!</span> The hotel block
		will only remain open until
		<span class="font-extrabold"
			>{dayjs(blockCloseDate).format('dddd, MMMM D, YYYY')}. So please take care of it now!</span
		> Daily Water Park passes are included with your booking of a Kalahari hotel room. Really, go book
		right now!
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl text-gray-800 font-extrabold">Room Compensation</h2>

	<p class="mt-4 prose prose-lg text-gray-500">
		As a thank you for being a Counselor, we will reimburse you for two nights stay in a standard
		room for each day that you speak (up to a total of three nights per family of multiple
		speakers). To reserve the room, the Kalahari requires a deposit of one night's stay plus tax.
		THAT Conference works directly with the Kalahari to apply the appropriate credits to your
		account during the conference. You will see the proper credits applied to your final bill upon
		checkout.
	</p>

	<div class="antialiased mt-6">
		<div class="p-4 border rounded-md bg-gray-50 ">
			<div class="text-sm">
				<p class="text-gray-900 font-semibold">Room Compensation</p>

				<div class="mt-4">
					<div class="relative flex items-center">
						<Checkbox
							checked={declinedRoomComp}
							on:change={({ detail }) => (declinedRoomComp = detail)}
							size="2.5rem"
							class="flex-none"
						/>

						<div class="ml-6 text-lg">
							<p class="leading-7 font-medium text-gray-500">
								I would like donate my room compensation back to THAT Conference and/or I do not
								need to stay at the resort.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button on:click={handleSubmit}>
			<Shell>
				<div class="px-8 py-2 font-extrabold">Next Steps</div>
			</Shell>
		</button>
	</div>
</div>

<style>
	.hover:hover {
		@apply text-thatOrange-400;
		@apply underline;
		@apply text-thatOrange-500;
	}
</style>
