<script>
	export let href;

	import { scrollto } from 'svelte-scrollto';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore missing-declaration -->

<a
	use:scrollto={href}
	class="rounded-md border-2 border-thatBlue-500 bg-white px-8 py-2 text-base font-medium
    leading-6 text-thatBlue-500 shadow transition
    duration-150 ease-in-out hover:bg-thatBlue-500 hover:text-white
    focus:border-thatBlue-800 focus:bg-thatBlue-500 focus:text-white
    focus:outline-none focus:ring-thatBlue-500 md:px-10 md:text-lg"
>
	<span>
		<slot />
	</span>
</a>
