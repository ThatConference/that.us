<script>
	export let tags = [];
	export let title;
</script>

<svelte:head>
	<title>{title}</title>
	{#each tags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>
