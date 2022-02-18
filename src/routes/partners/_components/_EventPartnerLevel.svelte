<script>
	export let header;
	export let partners = [];

	import PartnerCard from '$components/partners/PartnerCard.svelte';
</script>

<div class="py-12">
	<h2
		class="inline text-3xl font-extrabold tracking-tight text-thatOrange-400 sm:block sm:text-4xl"
	>
		{header}
	</h2>
	<div class="pt-8">
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each partners as p, i (p.id)}
				<li
					class="col-span-1 flex transform flex-col rounded-lg bg-white text-center shadow transition duration-500 ease-in-out hover:scale-105 hover:bg-that-offWhite"
				>
					<a open href={`/partners/${p.slug}`}>
						<PartnerCard {...p} />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
