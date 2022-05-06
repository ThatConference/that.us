<script>
	export let steps;

	import Step from './step.svelte';
</script>

<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
	<h2 id="timeline-title" class="text-lg font-medium text-gray-900">Enrollment Steps</h2>

	<div class="mt-6 flow-root">
		<ul class="-mb-8">
			{#key steps}
				{#each steps as { title, completed }, index}
					<li>
						<Step
							{title}
							{completed}
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
