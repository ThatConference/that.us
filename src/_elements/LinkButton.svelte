<script>
	export let href;
	export let text;
	export let disabled = false;
</script>

<div class:disabled>
	<a
		exact
		{href}
		class="flex w-full items-center justify-center rounded-md border border-transparent
    bg-thatOrange-400 px-8 py-3 text-base font-medium leading-6
    text-white transition duration-150
    ease-in-out hover:bg-thatOrange-500 focus:border-thatOrange-700
    focus:outline-none focus:ring-that-orange md:px-10 md:py-4 md:text-lg">
		{text}
	</a>
</div>
