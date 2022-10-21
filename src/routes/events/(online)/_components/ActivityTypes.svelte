<script>
	import ActivityType from './ActivityType.svelte';
	const examples = [
		{
			title: 'Presentations',
			copy: 'The traditional session style, in which an idea, product, or piece of work is shown and explained to an audience. Best when left ample time for Q&A.'
		},
		{
			title: 'Peer Reviews',
			copy: "A conversation centered on one's piece of work with others who have similar interests. This style is meant to be interactive with participants for all to help, learn, or understand the topic."
		},
		{
			title: 'Q&A',
			copy: 'A style in which a person or group of people ask questions and others provide answers. This format is intended to be open-ended along with the inclusion of all opinions if an opinion-style question is asked.'
		},
		{
			title: 'Open Space',
			copy: 'An activity designed around discussing a topic or sharing an experience with others. This style is meant to be interactive with all participants interested in similar topics.'
		},
		{
			title: 'Panel Discusion',
			copy: 'A style in which a group of people in a specific topic engage in conversation together in front of an audience.'
		},
		{
			title: 'Social',
			copy: 'Get to know one another better by engaging everyone in the conversation. Make sure to give everyone space to participate.'
		}
	];
</script>

<div
	class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
	{#each examples as e}
		<div class="group relative bg-white p-6">
			<ActivityType {...e} />
		</div>
	{/each}
</div>
