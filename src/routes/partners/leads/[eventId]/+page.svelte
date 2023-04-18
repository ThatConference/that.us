<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Circle3 } from 'svelte-loading-spinners';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import NumPad from '$components/numberPad/Panel.svelte';
	import { Shell } from '$elements/buttons';
	import leadsMutationApi from '$dataSources/api.that.tech/partner/leads/mutations';

	const metaTags = ((title = 'Lead Capture - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/leads`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	const { addPin } = leadsMutationApi();
	const { eventId } = $page.params;

	let pinNumber = '';
	let partnerNotes;
	let waiting = false;

	let contactExchangeError = false;
	let comtactExchangeErrorMessage;

	async function handleContactExchange() {
		waiting = true;
		const { result, message } = await addPin(eventId, pinNumber, partnerNotes);

		waiting = false;

		if (result) {
			pinNumber = '';
			partnerNotes = undefined;
		} else {
			contactExchangeError = true;
			comtactExchangeErrorMessage = message;
		}
	}

	function tryAgain() {
		contactExchangeError = false;
		comtactExchangeErrorMessage = undefined;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<h1 class="mt-6 text-xl font-bold leading-6 text-thatBlue-800">THAT Contact Exchange</h1>
	<div class="absolute right-0 top-0 block pr-4 pt-4">
		<button
			type="button"
			class="rounded-full border-2 border-gray-200 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-thatBlue-500 focus:ring-offset-2"
			on:click={() => goto('/')}>
			<span class="sr-only">Close</span>
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<div class="mx-auto mt-4 max-w-sm">
		{#if waiting}
			<div class="relative my-6 flex flex-col items-center space-y-6">
				<Circle3
					size={'60'}
					unit={'px'}
					ballTopLeft="#f74646"
					ballTopRight="#ff834d"
					ballBottomLeft="#26529A"
					ballBottomRight="#555555" />

				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">Invoking api and adding contact.</p>
				</div>
			</div>
		{:else if contactExchangeError}
			<div class="relative my-6 flex flex-col space-y-6">
				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">
						{comtactExchangeErrorMessage}
					</p>
				</div>

				<div class="flex">
					<Shell>
						<button
							type="button"
							class="w-full py-4 text-sm font-medium leading-5"
							on:click={() => tryAgain()}>
							<span class="text-lg">Retry</span>
						</button>
					</Shell>
				</div>
			</div>
		{:else}
			<div class="flex w-full flex-col space-y-4">
				<div class="rounded-xl border bg-gray-50 bg-opacity-50 p-8 shadow-md">
					<NumPad
						on:digit={(event) => {
							pinNumber = pinNumber.concat(event.detail);
						}}
						on:backspace={() => {
							pinNumber = pinNumber.slice(0, -1);
						}} />
				</div>

				<div
					class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-thatBlue-800 focus-within:ring-1 focus-within:ring-thatBlue-800">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						type="text"
						name="pinNumber"
						bind:value={pinNumber}
						class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
						placeholder="E.g. 1234" />
				</div>

				<div class="flex">
					<Shell>
						<button
							type="button"
							class="w-full py-4 text-sm font-medium leading-5"
							on:click={() => handleContactExchange()}>
							<span class="text-lg">Connect</span>
						</button>
					</Shell>
				</div>

				<div>
					<textarea
						name="notes"
						type="textarea"
						rows="10"
						multiline={true}
						bind:value={partnerNotes}
						class="form-input w-full rounded-md  border border-gray-300 hover:border-gray-700 sm:text-sm sm:leading-5"
						placeholder="E.g. Jane would be a great fit for our company." />
				</div>
			</div>
		{/if}
	</div>
</div>
