<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let bold = false;
</script>

<button
	type="button"
	on:click={() => dispatch('press')}
	on:keyPress={() => dispatch('press')}
	class="focus:shadow-outline z-10 m-2 flex h-24 w-24 select-none items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-900 shadow hover:bg-gray-200 focus:outline-none {$$props.class}"
	class:font-bold={bold}
	class:text-2xl={bold}
>
	<slot />
</button>
