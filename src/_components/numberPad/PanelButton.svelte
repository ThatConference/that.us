<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let bold = false;
</script>

<button
	on:click={() => dispatch('press')}
	on:keyPress={() => dispatch('press')}
	class="z-10 border-2 bg-white border-gray-200 hover:bg-gray-200 shadow m-2 rounded-full h-24 w-24 flex items-center justify-center text-gray-900 select-none focus:outline-none focus:shadow-outline {$$props.class}"
	class:font-bold={bold}
	class:text-2xl={bold}
>
	<slot />
</button>
