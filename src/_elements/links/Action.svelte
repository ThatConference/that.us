<script>
	export let href;
	export let reload = false;
</script>

<a
	button={true}
	{reload}
	{href}
	class="cursor-pointer rounded-md border-2 border-transparent bg-thatBlue-500 px-8 py-3
    text-center text-base font-medium leading-6 text-white shadow transition
    duration-150 ease-in-out hover:bg-thatBlue-400 focus:border-thatBlue-700
    focus:outline-none focus:ring-that-blue
    md:px-10 md:py-4 md:text-lg">
	<span>
		<slot />
	</span>
</a>
