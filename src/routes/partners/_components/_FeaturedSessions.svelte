<script>
	export let sessions = [];

	import { fade } from 'svelte/transition';
	import lodash from 'lodash';

	import Card from '$components/activities/Card.svelte';

	const { sortBy } = lodash;
</script>

<section class="bg-white py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-thatBlue-800 sm:text-4xl">
					Featured Sessions
				</h2>
			</div>

			<div>
				<ul class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{#each sortBy(sessions, 'startTime') as activity (activity.id)}
						<li in:fade class="col-span-1 rounded-lg bg-white shadow-lg">
							<Card {...activity} editMode={false} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
