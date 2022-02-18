<script>
	export let activities = [];

	import Submission from './submission.svelte';
</script>

<div>
	<div class="overflow-hidden bg-white shadow sm:rounded-md">
		<ul class="divide-y divide-gray-200">
			{#each activities as activity}
				<Submission {activity} />
			{/each}
		</ul>
	</div>
</div>
