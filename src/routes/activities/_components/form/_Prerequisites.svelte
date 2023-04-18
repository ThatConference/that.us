<script>
	export let isRequired = false;

	import { Input } from 'sveltejs-forms';
</script>

<div class="px-4 sm:px-6">
	<div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
		<div class="sm:col-span-6">
			<label for="activity_full_description" class="block text-sm font-medium text-gray-700">
				Prerequisites or Previous Experience
			</label>
			{#if isRequired}
				<div class="relative">
					<span
						class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
				</div>
			{/if}
			<div>
				<p class="mt-1 text-sm text-gray-400">
					What are, if any, the things a geek should know or have before attending this activity?
				</p>
			</div>
			<div class="mt-4">
				<Input
					name="prerequisites"
					multiline
					rows="5"
					spellcheck="true"
					class="form-input w-full hover:border-gray-700 sm:text-sm sm:leading-5" />
			</div>
		</div>
	</div>
</div>
