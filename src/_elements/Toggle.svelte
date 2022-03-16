<script>
	export let title;
	export let subTitle;
	export let checked = false;
</script>

<div class="relative flex items-center">
	<button
		type="button"
		class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-thatBlue-500 focus:ring-offset-2"
		class:bg-thatBlue-500={checked}
		class:bg-gray-200={!checked}
		on:click|preventDefault={() => (checked = !checked)}>
		<span
			aria-hidden="true"
			class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
			class:translate-x-5={checked} />
	</button>
	<span class="ml-3" id="annual-billing-label">
		<span class="text-sm font-medium text-gray-900">{title}</span>
		<span class="text-sm text-gray-500">({subTitle})</span>
	</span>
</div>
