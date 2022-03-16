<script>
	export let stepName = '';
</script>

<div class="group flex w-full items-center">
	<span class="flex items-center px-6 py-4 text-sm font-medium">
		<span
			class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-thatOrange-400">
			<svg
				class="h-6 w-6 text-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd" />
			</svg>
		</span>
		<span class="ml-4 text-sm font-medium text-gray-900">{stepName}</span>
	</span>
</div>
