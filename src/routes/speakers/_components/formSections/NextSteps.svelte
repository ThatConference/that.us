<script>
	import { createEventDispatcher } from 'svelte';

	import { Shell } from '$elements/buttons';

	const dispatch = createEventDispatcher();
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg">
		Ball tip ham capicola alcatra prosciutto. Biltong short ribs jowl, salami buffalo swine cow pork
		belly chuck boudin chicken meatball hamburger kielbasa. Strip steak doner chislic short ribs
		pork belly.
	</p>
</div>

<div class="mt-12">
	<h2 class="text-xl text-gray-800 font-extrabold">Please fill out the approiate information.</h2>

	<div>content here.. based on platform.</div>
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button on:click={() => dispatch('submit-step')}>
			<Shell>
				<div class="px-8 py-2 font-extrabold">Complete Enrollment</div>
			</Shell>
		</button>
	</div>
</div>
