<script>
	export let setField;
	export let initialData;
	export let dropDownValues;

	import { Input } from 'sveltejs-forms';

	const { duration } = dropDownValues;

	let durationSelected = initialData?.duration || undefined;
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Hong long is this workshop?
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
				/>
			</div>
			<!-- <div>
				<p class="mt-1 text-sm text-gray-400">write me</p>
			</div> -->
			<div class="mt-4">
				<Input hidden name="duration" value={durationSelected} />
				<div class="w-full">
					<fieldset>
						<legend class="sr-only">Workshop Duration</legend>
						<div
							class="rounded-md w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
						>
							{#each duration.options as option}
								<div class="flex-grow">
									<label
										class="border-gray-200 bg-white rounded-lg relative border p-4 flex cursor-pointer"
									>
										<input
											type="radio"
											value={option.value}
											bind:group={durationSelected}
											on:change={({ target }) => setField('duration', target.value)}
											class="h-4 w-4 mt-0.5 cursor-pointer text-thatOrange-500 border-gray-300 focus:ring-thatOrange-400"
											aria-labelledby="privacy-setting-0-label"
											aria-describedby="privacy-setting-0-description"
										/>
										<div class="ml-3">
											<span
												id="privacy-setting-0-label"
												class="text-gray-900 block text-sm font-medium"
											>
												{option.label}
											</span>
										</div>
									</label>
								</div>
							{/each}
						</div>
					</fieldset>
				</div>
			</div>
		</div>

		<div class="sm:col-span-6">
			<label for="activity_agenda" class="block text-sm font-medium text-gray-700"> Agenda </label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
				/>
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					Please break down the overall flow of this workshop. We recognize things will likely
					change, but help everyone understand in detail what will be covered.
				</p>
			</div>
			<div class="mt-4">
				<Input
					name="agenda"
					multiline
					rows="10"
					spellcheck="true"
					class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
				/>
			</div>
		</div>
	</div>
</div>
