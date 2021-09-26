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
				<li class="col-span-1 bg-white rounded-lg shadow-lg">
					<div class="w-full flex items-center justify-between p-3 space-x-6">
						<div class="flex-1 truncate">
							<FacebookLoader uniqueKey="card" />
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
