<script>
	export let title;
	export let description;
</script>

<div class="flex items-center justify-between">
	<span class="flex flex-grow flex-col">
		<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">{title}</span>
		<span class="text-sm text-gray-500" id="availability-description">{description}</span>
	</span>

	<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->

	<button
		type="button"
		class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
		role="switch"
		aria-checked="false"
		aria-labelledby="availability-label"
		aria-describedby="availability-description">
		<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
		<span
			aria-hidden="true"
			class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
	</button>
</div>
