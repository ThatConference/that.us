<script>
	export let href;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore missing-declaration -->
<div class="h-full w-full flex">
	<a
		{href}
		class="flex-grow px-4 py-2 
      rounded-md shadow text-base leading-6 font-medium md:text-lg border-2 
      bg-white  
      border-thatBlue-500 text-thatBlue-500 
      hover:bg-thatBlue-500 hover:text-white 
      focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500 focus:border-thatBlue-800 
      transition duration-150 ease-in-out"
	>
		<div class="h-full flex items-center justify-center">
			<slot />
		</div>
	</a>
</div>
