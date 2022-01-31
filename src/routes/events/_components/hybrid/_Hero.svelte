<script>
	export let event;

	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import { scrollto } from 'svelte-scrollto';

	import { Shell } from '$elements/buttons';

	const venue = event.venues[0];
</script>

<div class="relative bg-thatBlue-200 bg-opacity-25">
	<div class="mx-auto max-w-7xl w-full pt-10 pb-10 text-center">
		<div class="flex flex-col">
			<img class="relative h-96 " src={event.logo} alt="" />

			<div class="p-8 font-extrabold">
				<p class="text-3xl tracking-tight text-gray-500">
					{dayjs(event.startDate).format('MMMM D, YYYY')} - {dayjs(event.endDate).format(
						'MMMM D, YYYY'
					)}
				</p>
				<p class="text-3xl tracking-tight text-gray-500">
					{`${venue.city}, ${venue.state}`}
				</p>
			</div>

			<div class="relative p-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
				<div class="flex-1 rounded-md shadow">
					<a use:scrollto={'#tickets'}>
						<Shell>
							<div class="px-4 py-2 font-extrabold uppercase">Tickets</div>
						</Shell>
					</a>
				</div>

				<div class="flex-1 rounded-md shadow">
					<a use:scrollto={'#sponsors'}>
						<Shell>
							<div class="px-4 py-2 font-extrabold uppercase">Sponsorships</div>
						</Shell>
					</a>
				</div>

				<div class="flex-1 rounded-md shadow">
					<a href={`/support/travel/${$page.params.event}`}>
						<Shell>
							<div class="px-4 py-2 font-extrabold uppercase">Travel</div>
						</Shell>
					</a>
				</div>

				{#if event.isCallForSpeakersOpen === true}
					<div class="flex-1 rounded-md shadow">
						<a href={`/call-for-counselors/${event.slug}/`}>
							<Shell>
								<div class="px-4 py-2 font-extrabold uppercase">Call For Counselors</div>
							</Shell>
						</a>
					</div>
				{:else}
					<div class="flex-1 rounded-md shadow">
						<a use:scrollto={'#upnext'}>
							<Shell>
								<div class="px-4 py-2 font-extrabold uppercase">Schedule</div>
							</Shell>
						</a>
					</div>
				{/if}
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
</div>

<style>
	.shadowText {
		text-shadow: white 0.1em 0.1em 0.2em;
	}
</style>
