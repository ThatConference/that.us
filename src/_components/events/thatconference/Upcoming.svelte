<script>
	export let events;

	import Card from './_components/EventCard.svelte';
	import Layout from './_components/Layout.svelte';

	import Trees from '$elements/svgs/Trees.svelte';
</script>

<div class="relative overflow-hidden ">
	<div class="-mt-32 flex translate-y-32 flex-col items-center">
		<Trees classes="h-64 w-64 text-thatRed-500" />
	</div>

	<div class="backgroundImage bg-cover bg-center">
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6">
			<Layout>
				<div class="flex grid-cols-2 flex-col place-content-around gap-24 lg:grid">
					{#each events as event}
						<div class="p-8">
							<Card {event} />
						</div>
					{/each}
				</div>
			</Layout>
		</div>
	</div>
</div>

<!--
	isCallForOnSpeakersOpen: false
	isCallForSpeakersOpen: false

	show button
	ticketsOnSaleFrom: "2022-01-01T06:00:17.238Z"
	ticketsOnSaleUntil: "2022-05-26T22:00:54.718Z"

	button... 
	callForOnSpeakersOpenDate: "2021-11-01T05:00:38.229Z"
	callForOnSpeakersCloseDate: "2022-01-01T05:59:26.205Z"

	button ...
	callForSpeakersOpenDate: "2021-07-28T17:00:13.647Z"
	callForSpeakersCloseDate: "2021-11-01T04:59:31.504Z"

-->
<style>
	.backgroundImage {
		background-image: linear-gradient(rgba(31, 42, 99, 0.8), rgba(31, 42, 99, 0.8)),
			url('/images/keynote-highlight.jpg');
	}
</style>
