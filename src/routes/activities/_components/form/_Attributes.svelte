<script>
	export let touched, errors, setField;
	export let initialData;

	import { createEventDispatcher, getContext } from 'svelte';

	import { Input } from 'sveltejs-forms';
	import Select from 'svelte-select';

	const { sessionCategory, category, sessionType } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');

	const dispatch = createEventDispatcher();

	// todo this works for now, but doesn't account for after call for speakers.
	const sessionTypeOptions = sessionType.options.filter(
		(i) => !['OPEN_SPACE', 'PANEL'].includes(i.value)
	);

	let selectedPriamaryCategoryValue = initialData.primaryCategory
		? sessionCategory.options.find((i) => i.value === initialData.primaryCategory)
		: undefined;

	let selectedSecondaryCategoriesValue = initialData.secondaryCategory
		? sessionCategory.options.filter((i) => initialData.secondaryCategory.includes(i.value))
		: undefined;

	let activityTypeSelected = initialData.type || undefined;
	let activityCategorySelected = initialData.category || undefined;
	let activityTargetLocationSelected = initialData.targetLocation || 'IN_PERSON';

	function onActivityTypeChange({ target }) {
		setField('type', target.value);
		dispatch('activity-type-selected', target.value);
	}
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
		<Input hidden name="targetLocation" value={activityTargetLocationSelected} />
		<!-- <div class="sm:col-span-6">
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Select the Desired Location
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					You can choose to speak online (ON THAT), in-person (AT THAT), or either-or (we will
					select based on the selection process). Note: ON THAT sessions are meant to be more of an
					interactive session where you're the guide rather than just than a typical
					presentation-forward session. You're also not bound by any time.
				</p>
			</div>
			<div class="mt-4">
				<Input hidden name="targetLocation" value={activityTargetLocationSelected} />
				<div class="w-full">
					<fieldset>
						<legend class="sr-only">Target Location</legend>
						<div
							class="flex w-full flex-col space-y-4 rounded-md sm:flex-row sm:space-y-0 sm:space-x-4">
							{#each targetLocation.options.filter((i) => i.value !== 'OTHER') as option}
								<div class="flex-grow">
									<label
										class="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-4">
										<input
											type="radio"
											value={option.value}
											bind:group={activityTargetLocationSelected}
											on:change={({ target }) => setField('targetLocation', target.value)}
											class="mt-0.5 h-4 w-4 cursor-pointer border-gray-300 text-thatOrange-500 focus:ring-thatOrange-400" />
										<div class="ml-3">
											<span class="block text-sm font-medium text-gray-900">
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
		</div> -->

		<div class="sm:col-span-6">
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Target Track
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">Who is this intended for?</p>
			</div>
			<div class="mt-4">
				<Input hidden name="category" value={activityCategorySelected} />
				<div class="w-full">
					<fieldset>
						<legend class="sr-only">Target Track</legend>
						<div
							class="flex w-full flex-col space-y-4 rounded-md sm:flex-row sm:space-x-4 sm:space-y-0">
							{#each category.options as option}
								<div class="flex-grow">
									<label
										class="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-4">
										<input
											type="radio"
											value={option.value}
											bind:group={activityCategorySelected}
											on:change={({ target }) => setField('category', target.value)}
											class="mt-0.5 h-4 w-4 cursor-pointer border-gray-300 text-thatOrange-500 focus:ring-thatOrange-400" />
										<div class="ml-3">
											<span
												id="privacy-setting-0-label"
												class="block text-sm font-medium text-gray-900">
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
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Activity Type
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">What is the overall format for this activity?</p>
			</div>
			<div class="mt-4">
				<Input hidden name="type" value={activityTypeSelected} />
				<div class="w-full">
					<fieldset>
						<legend class="sr-only">Session Type</legend>
						<div class="w-full -space-y-px rounded-lg border border-gray-200 bg-white">
							{#each sessionTypeOptions as option, i}
								<label
									class="relative flex cursor-pointer border-gray-200 p-4"
									class:border-t={i > 0}>
									<input
										type="radio"
										id={option.label}
										value={option.value}
										bind:group={activityTypeSelected}
										on:change={onActivityTypeChange}
										class="mt-0.5 h-4 w-4 cursor-pointer border-gray-300 text-thatOrange-500 focus:ring-thatOrange-400" />
									<div class="ml-3">
										<span
											id="privacy-setting-0-label"
											class="block text-sm font-medium text-gray-900">
											{option.label}
										</span>
									</div>
								</label>
							{/each}
						</div>
					</fieldset>
				</div>
			</div>
		</div>

		<div class="sm:col-span-6">
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Primary Category
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					You might not find a perfect fit, but please choose something that best applies.
				</p>
			</div>
			<div class="mt-4">
				<div class="w-full">
					<Select
						inputAttributes={{ name: 'primaryCategory' }}
						items={sessionCategory.options}
						bind:value={selectedPriamaryCategoryValue}
						on:select={({ detail }) => setField('primaryCategory', detail.value)}
						on:clear={() => setField('primaryCategory', undefined)}
						hasError={touched['primaryCategory'] && errors['primaryCategory']}
						inputStyles="form-select relative block w-full bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-md shadow-sm hover:border-gray-700" />
					{#if touched['primaryCategory'] && errors['primaryCategory']}
						<p class="italic text-red-600">{errors['primaryCategory']}</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="sm:col-span-6">
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Secondary Categories
			</label>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					You might not find a perfect fit, but please choose something that best applies.
				</p>
			</div>
			<div class="mt-4">
				<div class="w-full">
					<Select
						isMulti={true}
						inputAttributes={{ name: 'secondaryCategory' }}
						items={sessionCategory.options}
						bind:value={selectedSecondaryCategoriesValue}
						on:select={({ detail }) =>
							setField('secondaryCategory', detail ? detail.map((i) => i.value) : [])}
						on:clear={() => setField('secondaryCategory', [])}
						hasError={touched['secondaryCategory'] && errors['secondaryCategory']}
						inputStyles="form-select relative block w-full bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-md shadow-sm hover:border-gray-700" />
					{#if touched['secondaryCategory'] && errors['secondaryCategory']}
						<p class="italic text-red-600">{errors['secondaryCategory']}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
