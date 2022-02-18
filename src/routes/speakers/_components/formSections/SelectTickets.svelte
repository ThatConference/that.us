<script>
	export let platform;
	export let eventDetails;

	import { createEventDispatcher } from 'svelte';

	import { CheckFull } from '$elements/svgs';
	import { Shell } from '$elements/buttons';
	import { kalahari } from '$utils/config';

	const isAt = platform === 'AT_THAT';
	const dispatch = createEventDispatcher();

	const atThatSpeakerTicket = {
		title: 'AT THAT Counselor Ticket',
		description: 'This is your full access ticket to Everything THAT.',
		uiReference: 'COUNSELOR_AT_THAT'
	};

	const onThatSpeakerTicket = {
		title: 'ON THAT Counselor Ticket',
		description: 'This is your full access ticket to Everything THAT.',
		uiReference: 'COUNSELOR_ON_THAT'
	};

	let speakerTicket = isAt ? atThatSpeakerTicket : onThatSpeakerTicket;

	let atThatAdditionalTickets = {
		'1': {
			title: 'Complimenatary Campmate Ticket',
			description: 'If you so choose to bring your significant other, this is their ticket.',
			selected: false,
			uiReference: 'CAMPMATE'
		},
		'2': {
			title: 'Complimenatary Geekling #1 Ticket',
			description: 'Do you have a short stack? Bring them along.',
			selected: false,
			uiReference: 'GEEKLING'
		},
		'3': {
			title: 'Complimenatary Geekling #2 Ticket',
			description: 'Do you have a short stack? Bring them along.',
			selected: false,
			uiReference: 'GEEKLING'
		}
	};

	function handleTicketSelection(id) {
		atThatAdditionalTickets[id].selected = !atThatAdditionalTickets[id].selected;
	}

	function handleSubmit() {
		let tickets;

		if (isAt) {
			tickets = [
				atThatSpeakerTicket,
				...Object.keys(atThatAdditionalTickets)
					.map((i) => atThatAdditionalTickets[i])
					.filter((t) => t.selected)
			];
		} else {
			tickets = [onThatSpeakerTicket];
		}

		dispatch('submit-step', {
			eventSlug: eventDetails.slug,
			products: tickets.map((i) => i.uiReference)
		});
	}
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg text-gray-500">
		As part of agreeing to speak at THAT, you, of course, need a badge. If you were selected to
		present AT THAT, you also get to bring your family.
	</p>
	<p class="prose prose-lg mt-4 text-gray-500">
		You will also receive a free ON THAT (virtual ticket) camper to give away to anyone you wish. We
		will send you further instructions on how to do so later.
	</p>
	{#if !isAt}
		<p class="prose prose-lg mt-4 text-gray-500">
			If you would like to attend in-person please contact us.
		</p>
	{/if}
	<p class="prose prose-lg mt-4 text-gray-500">
		But wait, that's not all! Feel free to pass along this discount code <span
			class="font-extrabold text-gray-900"
			>{kalahari.speakerPasskey[eventDetails.slug].discountCode}</span
		> to the geeks at your company. It's a small token of our appreciation for letting you be an active
		part of THAT.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Your Counselor Ticket</h2>

	<div class="w-full text-left">
		<div class="mt-4">
			<div
				class="flex flex-1 items-center justify-between rounded-md border border-green-500 bg-green-50"
			>
				<div class="flex-1 px-4 py-2 text-sm">
					<p class="font-bold text-gray-900">{speakerTicket.title}</p>
					<p class="text-gray-500">{speakerTicket.description}</p>
				</div>

				<div class="flex-shrink-0 pr-4">
					<span
						class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 bg-opacity-60"
					>
						<CheckFull height="h-4" width="w-4" />
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="mt-12">
	{#if platform === 'AT_THAT'}
		<h2 class="text-xl font-extrabold text-gray-800">
			Please select any additional family tickets.
		</h2>
		{#each Object.entries(atThatAdditionalTickets) as [key, ticket]}
			<button
				type="button"
				on:click={() => handleTicketSelection(key)}
				disabled={ticket.isSpeakerTicket}
				class="w-full transform text-left transition duration-500 ease-in-out "
				class:hover:scale-105={!ticket.isSpeakerTicket}
				class:cursor-default={ticket.isSpeakerTicket}
			>
				<div class="mt-4">
					<div
						class="flex flex-1 items-center justify-between rounded-md border bg-gray-50"
						class:border-green-500={ticket.selected}
						class:bg-green-50={ticket.selected}
					>
						<div class="flex-1 px-4 py-2 text-sm">
							<p class="font-bold text-gray-900">{ticket.title}</p>
							<p class="text-gray-500">{ticket.description}</p>
						</div>

						<div class="flex-shrink-0 pr-4">
							{#if ticket.selected}
								<span
									class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 bg-opacity-60"
								>
									<CheckFull height="h-4" width="w-4" />
								</span>
							{/if}
						</div>
					</div>
				</div>
			</button>
		{/each}
	{/if}
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button on:click={handleSubmit}>
			<Shell>
				<div class="px-8 py-2 font-extrabold">
					{platform === 'AT_THAT' ? 'Next, Gear and Chow' : 'Next, Gear'}
				</div>
			</Shell>
		</button>
	</div>
</div>
