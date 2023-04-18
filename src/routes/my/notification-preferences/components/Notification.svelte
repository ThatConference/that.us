<script>
	export let title;
	export let description;
	export let frequency;
	export let checked;
	export let disabled = false;

	import Toggle from '$elements/toggles/Toggle.svelte';
</script>

<div class="mt-12">
	<div class="flex flex-col space-y-6 ">
		<div class="shado rounded-lg bg-gray-200" class:bg-white={!disabled}>
			<div class="divide-y divide-gray-200">
				<div class="flex items-center space-x-12 px-4 py-4 sm:px-6">
					<div class="flex-grow">
						<div class="flex flex-col space-x-4 space-y-4 ">
							<div class="flex justify-between">
								<div>
									<p class="text-xl font-bold leading-6 text-thatBlue-500">{title}</p>
								</div>
								<div class="">
									<Toggle on:toggled {checked} {disabled} />
								</div>
							</div>
							<div>
								<p class="lineBreaks p-4 text-lg text-gray-500">{description}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="px-6 py-4">
					<div class="text-lg font-semibold text-gray-500">Frequency:</div>
					<p class="p-4 text-lg text-gray-500">
						{frequency}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
