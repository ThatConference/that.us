<script>
	export let numberOfCards = 3;
	export let showHeader = true;

	import { FacebookLoader } from 'svelte-content-loader';
	import { GroupHeader } from '$elements';

	let cardsToShow = new Array(numberOfCards);
</script>

<div>
	{#if showHeader}
		<div class="flex items-center justify-center py-12">
			<GroupHeader>Fetching all THAT awesome!</GroupHeader>
		</div>
	{/if}

	<div>
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each cardsToShow as card}
				<li class="col-span-1 rounded-lg bg-white shadow-lg">
					<div class="flex w-full items-center justify-between space-x-6 p-3">
						<div class="flex-1 truncate">
							<FacebookLoader uniqueKey="card" />
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
