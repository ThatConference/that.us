<script>
	export let sessions = [];
	export let platform;
	export let eventDetails;

	import { createEventDispatcher } from 'svelte';
	import Icon from 'svelte-awesome';
	import { caretDown } from '$components/svelte-awesome-icons';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import utc from 'dayjs/plugin/utc.js';

	import { truncate, isLongerThan } from '$utils/truncate';
	import { Shell } from '$elements/buttons';

	import DeclineModal from './DeclineModal.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	const platformText = platform === 'AT_THAT' ? 'AT THAT' : 'ON THAT';
	const dispatch = createEventDispatcher();

	let expandDescription = false;
	let isDeclining = false;

	function handleSpeakerAccept(_) {
		dispatch('submit-step', { eventSlug: eventDetails.slug, agreeToSpeak: true });
	}

	function handleSpeakerDecline(event) {
		isDeclining = false;

		dispatch('speaker-decline', {
			eventSlug: eventDetails.slug,
			agreeToSpeak: false,
			reason: event.detail.reasonGiven
		});
	}
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg text-gray-500">
		It's hard to describe the excitement running through camp right now. THAT Conference is right
		around the corner, and we can't wait to name you as one of our counselors! We're so grateful for
		all the geeks who submitted sessions all over the globe to better the community. After multiple
		days of discussions, we've selected you to present the following sessions:
	</p>
</div>

<div class="mt-8">
	<h2 class="text-xl font-extrabold text-gray-800">Event Details</h2>

	<div
		class="mt-4 flex flex-col items-center justify-center space-y-6 rounded-md border bg-gray-50 px-4 py-4 sm:flex-row sm:space-x-8 sm:space-y-0 sm:py-0">
		<div class="flex flex-col items-center sm:items-start">
			<div class="font-extrabold">{eventDetails.name}</div>
			<div class="text-gray-500">
				<span>{dayjs(eventDetails.startDate).format('dddd, MMMM D')}</span> -
				<span>{dayjs(eventDetails.endDate).format('dddd, MMMM D, YYYY')}</span>
			</div>
		</div>

		<div class="flex flex-col items-center sm:items-start">
			<div class="text-gray-500">Session Location</div>
			<div class="font-extrabold">
				{platformText}
			</div>
		</div>

		<div class="grid flex-grow">
			<img
				class="h-24 w-24 justify-self-center sm:justify-self-end"
				src={eventDetails.logo}
				alt="event logo" />
		</div>
	</div>
</div>

<div class="mt-8">
	<h2 class="text-xl font-extrabold text-gray-800">
		{#if sessions.length > 1}
			Accepted Sessions <span class="italic">{platformText}</span>
		{:else}
			Accepted Session <span class="italic">{platformText}</span>
		{/if}
	</h2>

	{#each sessions as session}
		<div class="mt-4 grid-cols-3 gap-6 rounded-md border bg-gray-50 p-4 sm:grid">
			<div class="col-span-2">
				<p class="font-extrabold">{session.title}</p>

				<div
					class="flex-grow px-3 pb-3"
					class:cursor-pointer={isLongerThan(session.shortDescription, 25)}
					on:click|preventDefault={() => (expandDescription = !expandDescription)}>
					<p class="break-words text-sm leading-5 text-gray-500">
						{#if expandDescription}
							<span class="lineBreaks">{session.shortDescription}</span>
						{:else}
							<div class:hover:text-gray-300={isLongerThan(session.shortDescription, 25)}>
								<span>{truncate(session.shortDescription, 25)}</span>
								{#if isLongerThan(session.shortDescription, 25)}
									<Icon data={caretDown} class="ml-2" />
								{/if}
							</div>
						{/if}
					</p>
				</div>
			</div>
			<div>
				<p class="text-gray-500">Scheduled For:</p>
				{#if session?.startTime}
					<p class="font-extrabold">
						{dayjs(session.startTime).format('dddd, MMMM D, YYYY')}
					</p>
					<p class="font-extrabold">
						{dayjs(session.startTime).format('h:mm A z')}
					</p>
				{:else}
					<p class="font-extrabold">unscheduled</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<div class="mt-8">
	<h2 class="text-xl font-extrabold text-gray-800">
		<span>Be Awesome Together</span>
	</h2>

	<div class="prose prose-xl mt-4 text-gray-500">
		<p>
			THAT Conference is dedicated to providing a safe, diverse, harassment-free conference
			experience for everyone, regardless of gender, sexual orientation, disability, physical
			appearance, body size, race, religion or age. In non legal terms, let's all support one
			another and be awesome together.
		</p>

		<div class="flex justify-start space-x-6">
			<a class="hover" href="/support/code-of-conduct/" target="_blank">Code Of Conduct</a>
			<a class="hover" href="/support/commitment-to-diversity/" target="_blank"
				>Commitment to Diversity</a>
			<a class="hover" href="/support/anti-harassment/" target="_blank">Anti-Harassment Policy</a>
		</div>
	</div>
</div>

<div class="mt-12 flex justify-center space-x-4 md:justify-end">
	<button type="button" on:click={handleSpeakerAccept}>
		<Shell>
			<div class="px-8 py-2 font-extrabold">Accept Your Invitation</div>
		</Shell>
	</button>

	<button type="button" on:click={() => (isDeclining = !isDeclining)}>
		<Shell class="border-gray-500">
			<div class="px-8 py-2 font-extrabold  text-gray-400">Decline Invitation</div>
		</Shell>
	</button>
</div>

{#if isDeclining}
	<DeclineModal
		on:speaker-decline={handleSpeakerDecline}
		on:click_outside={() => (isDeclining = false)} />
{/if}

<style>
	.hover:hover {
		@apply text-thatOrange-400;
		@apply underline;
		@apply text-thatOrange-500;
	}
</style>
