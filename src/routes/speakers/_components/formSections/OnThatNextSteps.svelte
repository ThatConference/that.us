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
	<p class="prose prose-lg">
		We think of ON THAT very differently. Sure it's online, aka everyone is online, but we want your
		time together to be interactive where you're the Trail Guide. Rather than big rooms of
		slide-slinging and faceless campers, we want smaller rooms with an engaging conversation
		centered around a topic. Think of it as an unconference with unlimited open space circles where
		they each have a Trail Guide. Read more about <a
			class="hover"
			target="_blank"
			href="/blog/posts/2021-10-21-what-is-that/">What exactly is all THAT about</a
		>.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Slide Decks</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		If you have a slide deck, we're asking you show a little love to our sponsors for helping
		support THAT. We will sent that to you once finished.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Tools and Software</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		Hopefully, it's just a button click. Your session (aka activity) is on that.us, and all you need
		is a browser. You will find a join button on both the cards and the details of an activity. When
		it's about time, that button will enable itself and take you into the room. You will need to
		allow webcam, audio, and desktop access.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Testing</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		We've set up a room for you to test out the platform. Log in and head over to
		<a class="hover" target="_blank" href="/join/test">https://that.us/join/test/</a>. In there, you
		can play around with how activities ( aka sessions ) work.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">Pro-Tips</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		Online presents a new set of challenges where some of our traditional queues are lost. One of
		the biggest things to remember, at least for me, is giving people the acoustic space to get
		involved. It does take work to facilitate that, and no need to be in a rush; we just set the
		starting time. Here are a few other things to think about:
	</p>

	<div class="prose prose-lg mt-4 text-gray-500">
		<ul>
			<li>
				After you share your screen, turn back on video, and your video will overlay your shared
				screen.
			</li>
			<li>Every activity has its own chat.</li>
			<li>After five folks, everyone who joins is muted</li>
			<li>
				If you'd like to see a gallery view of folks, just open another browser window but keep your
				video and audio off.
			</li>
			<li>People can raise their hands.</li>
			<li>Everyone is a moderator.</li>
		</ul>
	</div>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">You have a ON-THAT ticket!</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		You've been assigned a ticket to ON THAT, which you can view here
		<a class="hover" target="_blank" href="/my/settings/tickets"
			>https://that.us/my/settings/tickets/</a
		>. This gives you full access to all of the online sessions and the ability to create more. Yes,
		that's right if you want to talk about more, head over to
		<a class="hover" target="_blank" href="/activities/create">https://that.us/activities/create/</a
		> and create more sessions.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl font-extrabold text-gray-800">
		Enhance your Session with additional resources
	</h2>

	<p class="prose prose-xl mt-4 text-gray-500">
		You can update your session with any pointers to resources, etc. Just log in to
		<a class="hover" target="_blank" href="https://that.us/my/submissions/"
			>https://that.us/my/submissions/</a
		> and feel free to update.
	</p>
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
