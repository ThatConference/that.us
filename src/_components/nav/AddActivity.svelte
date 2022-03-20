<script>
	export let isDarkBackground = false;
	import Plus from '$elements/svgs/Plus.svelte';
</script>

<div class="relative inline-block h-12 w-12 ">
	<div
		class="rounded-full p-2 hover:bg-thatBlue-500 hover:text-white focus:text-white"
		class:hover:text-white={isDarkBackground}
		class:hover:bg-thatBlue-500={isDarkBackground}
		class:hover:focus:text-white={isDarkBackground}>
		<a href="/activities/create/">
			<Plus />
		</a>
	</div>
</div>
