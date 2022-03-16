<script>
	export let setField;
	export let initialData;

	import Tags from 'svelte-tags-input';
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
		<div class="sm:col-span-6">
			<label for="activity_tags" class="block text-sm font-medium text-gray-700">
				Search Tags
			</label>
			<div>
				<p class="mt-1 text-sm text-gray-400">
					Set 5 or less 'tags' to help categorize this chat. (return/enter is the delimiter)
				</p>
			</div>
			<div class="mt-4">
				<div class="tag-form-input w-full">
					<Tags
						name="tags"
						tags={initialData.tags}
						on:tags={({ detail }) => setField('tags', detail.tags)}
						allowBlur={true}
						maxTags={5}
						onlyUnique={true}
						class="form-input w-full hover:border-gray-700 sm:text-sm sm:leading-5" />
				</div>
			</div>
		</div>
	</div>
</div>
