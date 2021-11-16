<script>
	import { createEventDispatcher } from 'svelte';
	import { Shell } from '$elements/buttons';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('submit-step');
	}
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg">stuff here////</p>
</div>

<div class="mt-12">
	<h2 class="text-xl text-gray-800 font-extrabold">Here are a few items to think about.</h2>

	<div class="text-gray-500 prose prose-lg">
		<ul>
			<li>
				<span class="font-extrabold">Speaker Decks.</span> We don't have a speaker deck as much as we
				have a few slides for you to include. We will sent that to you once finished.
			</li>
			<li>
				<span class="font-extrabold">Mentoring.</span> If you'd like help; we're here to help. Feel free
				to reach out at anytime and if you checked the I need help box, you will see an email from us
				soon.
			</li>
			<li>
				<span class="font-extrabold">Book your stay, like now.</span>
			</li>
			<li><span class="font-extrabold">Help spread the good word.</span></li>
			<li><span class="font-extrabold">Make your profile shine.</span></li>
			<li><span class="font-extrabold">Tweak your session.</span></li>
		</ul>
	</div>
</div>

<div class="mt-12">
	<h2 class="text-xl text-gray-800 font-extrabold">Counselor Setup</h2>

	<p class="mt-4 text-gray-500 prose prose-xl">
		We recommend that you scout out your speaking room early, so when the time comes, you know
		exactly where you're going. If you ever find yourself completely lost, find a member of THAT
		Staff, and we will point you in the right direction. Every speaking room will have the
		following:
	</p>

	<div class="mt-4 text-gray-500 prose prose-xl">
		<ul>
			<li>Podium, Lectern.</li>
			<li>
				HDMI connectors for video. Would you mind bringing an appropriate adapter for your computer
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
	<h2 class="text-xl text-gray-800 font-extrabold">On-Site Registration</h2>

	<div class="mt-4 text-gray-500 prose prose-xl">
		<p>
			When you get to camp, head on over to Counselor Registration in the main atrium of the
			convention center, you can't miss it, we promise.
		</p>
	</div>
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button on:click={handleSubmit}>
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
