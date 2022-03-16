<script>
	export let isShortForm = false;

	import { fade } from 'svelte/transition';

	import Step from './_Step.svelte';

	const shortForm = [
		'Select a Location/Event',
		'Describe this Activity',
		'Activity Attributes',
		'Activity Takeaways and Resources',
		'Schedule the Time.',
		'Submit activity.'
	];

	const longForm = [
		'Select a Location/Event',
		'Describe this Activity',
		'Activity Attributes',
		'Target Audience',
		'Workshop Details (if applicable)',
		'Activity Takeaways and Resources',
		'Help us, Help You',
		'Submit activity.'
	];

	$: steps = isShortForm ? shortForm : longForm;
</script>

<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
	<h2 id="timeline-title" class="text-lg font-medium text-gray-900">Steps to Submit</h2>

	<div class="mt-6 flow-root">
		<ul class="-mb-8">
			{#key steps}
				{#each steps as name, index}
					<li in:fade={{ delay: index * 200 }}>
						<Step
							title={name}
							completed={false}
							stepNumber={index + 1}
							isLastItem={steps.length - 1 === index} />
					</li>
				{/each}
			{/key}
		</ul>
	</div>
	<div class="mt-12">
		<slot name="actions" />
	</div>
</div>
