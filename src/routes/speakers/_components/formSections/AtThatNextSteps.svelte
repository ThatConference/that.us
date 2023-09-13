<script>
	export let eventDetails;

	import { createEventDispatcher } from 'svelte';
	import { Shell } from '$elements/buttons';
	import { kalahari } from '$utils/config.public';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('submit-step');
	}
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg text-gray-500">
		It might seem like plenty of time until we descend into camp, but experience says it will be
		here before we all know it. In the meantime, we've tried to compile a list of items to get
		things kicked off, and if you ever need help, don't hesitate to get in touch with us.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Here are a few items to think about.</h2>

	<div class="prose prose-lg text-gray-500">
		<ul>
			<li>
				<span class="font-extrabold">Speaker Decks.</span> We don't have a speaker deck as much as we
				have a few slides for you to include. We will send that to you once finished.
			</li>
			<li>
				<span class="font-extrabold">Mentoring.</span> If you'd like help; we're here to help. Feel free
				to reach out at anytime and if you checked the "I need help" box when submitting, you will see
				an email from us soon.
			</li>
			<li>
				<span class="font-extrabold"
					>Book your stay, <a
						class="hover font-extrabold text-gray-500"
						target="_blank"
						rel="external noopener noreferrer"
						href={kalahari.speakerPasskey[eventDetails.slug].bookingUrl}>
						like now</a
					>!
					{#if kalahari.speakerPasskey[eventDetails.slug].accessCode}
						(Access Code: {kalahari.speakerPasskey[eventDetails.slug].accessCode})
					{/if}
				</span>
			</li>
			<li>Help spread the good word. Tell all your friends.</li>
			<li>
				Make your <a class="hover" target="_blank" href="/my/profiles/primary/">profile</a> shine.
			</li>
			<li>Tweak your <a class="hover" target="_blank" href="/my/submissions/">session</a>.</li>
		</ul>
	</div>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">On-Site Session Room Setup</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		We recommend that you scout out your speaking room early so that when the time comes you know
		exactly where you're going. If you ever find yourself completely lost, find a member of THAT
		Staff and we will point you in the right direction. Every speaking room will have the following:
	</p>

	<div class="prose prose-xl mt-4 text-gray-500">
		<ul>
			<li>Lectern; really it's a round high top cocktail table that sits flat 😉</li>
			<li>
				HDMI connectors for video. Make sure you bring an appropriate adapter for your computer
				(USB-C to HDMI, etc.)
			</li>
			<li>3.5mm audio (for direct laptop connection)</li>
			<li>Screen perspective will be 16x9 and 1080p resolution in all rooms.</li>
			<li>A lapel mic. Please use it.</li>
			<li>A power strip.</li>
			<li>An Ethernet jack (just in case) on a separate VLAN at each podium.</li>
			<li><strike>Bug Juice.</strike> Water.</li>
		</ul>
	</div>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">On-Site Registration</h2>

	<div class="prose prose-xl mt-4 text-gray-500">
		<p>
			When you get to camp, head on over to Counselor Registration in the main atrium of the
			convention center, you can't miss it, we promise.
		</p>
	</div>
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button type="button" on:click={handleSubmit}>
			<Shell>
				<div class="px-8 py-2 font-extrabold">Complete Enrollment</div>
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
