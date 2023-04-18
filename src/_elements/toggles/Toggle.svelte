<script>
	export let checked = false;
	export let disabled = false;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#if disabled}
	<div
		class="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent bg-gray-200"
		class:bg-thatBlue-500={checked}
		class:bg-gray-200={!checked}>
		<span
			aria-hidden="true"
			class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
			class:translate-x-5={checked} />
	</div>
{:else}
	<button
		type="button"
		class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-thatBlue-500 focus:ring-offset-2"
		class:bg-thatBlue-500={checked}
		class:bg-gray-200={!checked}
		role="switch"
		aria-checked="false"
		aria-labelledby="availability-label"
		aria-describedby="availability-description"
		on:click={() => {
			checked = !checked;
			dispatch('toggled', checked);
		}}>
		<span
			aria-hidden="true"
			class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
			class:translate-x-5={checked} />
	</button>
{/if}
