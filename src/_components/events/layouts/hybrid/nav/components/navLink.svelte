<script>
	export let href;
</script>

<div class="flex">
	<a
		sveltekit:prefetch
		{href}
		class="w-full rounded-md px-3 py-2 text-gray-600
			transition duration-150 ease-in-out 
		hover:bg-that-blue hover:text-white
		focus:bg-that-blue focus:text-white focus:outline-none">
		<div class="flex items-center">
			<svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
				<path d="M11 0h3L9 20H6l5-20z" />
			</svg>
			<span><slot /></span>
		</div>
	</a>
</div>
