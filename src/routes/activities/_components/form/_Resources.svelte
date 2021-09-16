<script>
	export let setField;
	export let initialData;

	import TakeAways from './components/_TakeAways.svelte';
	import AdditionalResources from './components/_AdditionalResources.svelte';
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-6">
		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Key Takeways
			</label>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					List a few items someone should expect to walk away with after attending this activity.
				</p>
			</div>
			<div class="mt-4">
				<TakeAways {setField} {initialData} />
			</div>
		</div>

		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Supporting Resources
			</label>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					Please provide links to any helpful resources, your presentation, SDK's, that someone
					might want after attending. You will be able to add or edit this list later.
				</p>
			</div>
			<div class="mt-4">
				<AdditionalResources {setField} {initialData} />
			</div>
		</div>
	</div>
</div>
