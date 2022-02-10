<script>
	export let href;
	export let reload = false;
</script>

<a
	button={true}
	{reload}
	{href}
	class="px-8 py-3 border-2 border-transparent leading-6 font-medium rounded-md
    shadow md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out
    text-base text-white bg-thatBlue-500 hover:bg-thatBlue-400
    focus:outline-none focus:border-thatBlue-700
    focus:ring-that-blue cursor-pointer"
>
	<span>
		<slot />
	</span>
</a>
