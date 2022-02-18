<script>
	export let touched, errors, setField;
	export let initialData;
	export let dropDownValues;

	import { Input } from 'sveltejs-forms';
	import Checkbox from 'svelte-checkbox';

	const { mentorship } = dropDownValues;

	let activityMentorshipSelected = initialData.mentorship || undefined;
	let canRecord = initialData.canRecord || false;
	let isMinor = initialData.isMinor || false;
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Why are you the best person to give this?
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
				/>
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					Are you an authority? Super passionate about this topic? Brag about yourself; we want you
					to.
				</p>
			</div>
			<div class="mt-4">
				<Input
					name="whyAreYou"
					multiline
					rows="5"
					spellcheck="true"
					class="form-input w-full hover:border-gray-700 sm:text-sm sm:leading-5"
				/>
			</div>
		</div>

		<div class="sm:col-span-6">
			<div class="flex items-center space-x-6">
				<div class="flex-grow">
					<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
						Are you under 18 years old?
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
						/>
					</div>
					<!-- <div>
						<p class="mt-1 text-sm text-gray-400">...WRITE ME...</p>
					</div> -->
				</div>

				<div>
					<Checkbox
						name="isMinor"
						checked={isMinor}
						on:change={({ detail }) => setField('isMinor', detail)}
						size="2.5rem"
						class="flex-none"
					/>
					{#if touched['isMinor'] && errors['isMinor']}
						<p class="italic text-red-600">
							{errors['isMinor']}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="sm:col-span-6">
			<div class="flex items-center space-x-6">
				<div class="flex-grow">
					<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
						Would you like to be recorded or streamed?
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
						/>
					</div>
					<div>
						<p class="mt-1 text-sm text-gray-400">
							If selected, and if we can record or stream any activities, would you mind being
							recorded? If selected and desired, you will need to sign a release form.
						</p>
					</div>
				</div>

				<div>
					<Checkbox
						name="canRecord"
						checked={canRecord}
						on:change={({ detail }) => setField('canRecord', detail)}
						size="2.5rem"
						class="flex-none"
					/>
					{#if touched['canRecord'] && errors['canRecord']}
						<p class="italic text-red-600">
							{errors['canRecord']}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Would you like some help?
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
				/>
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					If this activity is selected, how much mentorship/collaboration with our team would you
					like?
				</p>
			</div>
			<div class="mt-4">
				<Input hidden name="mentorship" value={activityMentorshipSelected} />
				<div class="w-full">
					<fieldset>
						<legend class="sr-only"> Privacy setting </legend>
						<div
							class="flex w-full flex-col space-y-4 rounded-md sm:flex-row sm:space-y-0 sm:space-x-4"
						>
							{#each mentorship.options as option}
								<div class="flex-grow">
									<label
										class="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-4"
									>
										<input
											type="radio"
											value={option.value}
											bind:group={activityMentorshipSelected}
											on:change={({ target }) => setField('mentorship', target.value)}
											class="mt-0.5 h-4 w-4 cursor-pointer border-gray-300 text-thatOrange-500 focus:ring-thatOrange-400"
											aria-labelledby="privacy-setting-0-label"
											aria-describedby="privacy-setting-0-description"
										/>
										<div class="ml-3">
											<span
												id="privacy-setting-0-label"
												class="block text-sm font-medium text-gray-900"
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
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				What else would you like us to know? How can we help?
			</label>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					Help us help you, seriously. We want you to be your best you, period.
				</p>
			</div>
			<div class="mt-4">
				<Input
					name="otherComments"
					multiline
					rows="5"
					spellcheck="true"
					class="form-input w-full hover:border-gray-700 sm:text-sm sm:leading-5"
				/>
			</div>
		</div>
	</div>
</div>
