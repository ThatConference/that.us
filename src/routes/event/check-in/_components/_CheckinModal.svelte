<script>
	export let ticketId;
	export let eventId;
	export let title;
	export let text;

	import { createEventDispatcher } from 'svelte';
	import { Circle3 } from 'svelte-loading-spinners';

	import Panel from '$components/numberPad/Panel.svelte';
	import { Shell } from '$elements/buttons';
	import checkinMutationApi from '$dataSources/api.that.tech/checkin/mutations';

	const dispatch = createEventDispatcher();
	const { checkIn } = checkinMutationApi();

	let pinNumber = '';
	let waiting = false;
	let checkInError = false;
	let checkInErroMessage;

	async function handleCheckIn() {
		waiting = true;

		const { result, message } = await checkIn(eventId, ticketId, pinNumber);

		waiting = false;

		if (result) {
			dispatch('checkinCompleted');
		} else {
			checkInError = true;
			checkInErroMessage = message;
		}
	}

	function tryAgain() {
		checkInError = false;
		checkInErroMessage = undefined;
	}
</script>

<div
	class="fixed inset-x-0 bottom-0 z-10 px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-0">
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		class="transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6">
		<div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
			<button
				type="button"
				class=" rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-thatBlue-500 focus:ring-offset-2"
				on:click={() => dispatch('close')}>
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

		<div>
			<div class="mt-4 text-center sm:mt-5">
				<h1 class="text-xl font-bold leading-6 text-gray-900" id="modal-headline">
					{title}
				</h1>
				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">{text}</p>
				</div>

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
							<p class="text-md leading-5 text-gray-500">Invoking api and making data.</p>
						</div>
					</div>
				{:else if checkInError}
					<div class="relative my-6 flex flex-col space-y-6">
						<div class="mt-2">
							<p class="text-md leading-5 text-gray-500">
								{checkInErroMessage}
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
					<div class="relative mt-6 flex flex-col space-y-6">
						<div>
							<Panel
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
								placeholder="1234" />
						</div>

						<div class="flex">
							<Shell>
								<button
									class="w-full py-4 text-sm font-medium leading-5"
									on:click={() => handleCheckIn()}>
									<span class="text-lg">Complete Check-In</span>
								</button>
							</Shell>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
