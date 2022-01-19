<script context="module">
	import * as yup from 'yup';

	const schema = yup.object().shape({
		url: yup.string().trim().required('Please enter the url for this article.'),
		description: yup
			.string()
			.trim()
			.required('Please tell us more about why people should see this.'),
		tags: yup
			.array()
			.ensure()
			.of(yup.string().required('Please enter a few tags to help catorgize this.'))
			.min(1, 'Please enter 1 or more tags.')
			.max(5, 'Please no more than 5 tags.')
	});
</script>

<script>
	export let handleSubmit;

	import Tags from 'svelte-tags-input';
	import { Circle3 } from 'svelte-loading-spinners';
	import { Form, Input } from 'sveltejs-forms';
	import ErrorNotificaiton from '$components/notifications/Error.svelte';

	import { Shell } from '$elements/buttons';
</script>

<div>
	<h2 class="text-xl leading-6 font-bold text-gray-900">Submit New Article</h2>

	<div class="text-gray-500 text-sm leading-5">
		<p class="my-4">
			As it turns out, the internet is a big place, and things move relatively fast. This is where
			you come in. If you find something that has helped you grow or would be of value to others,
			please submit it here. We will curate it and send it out in our weekly newsletter.
		</p>
	</div>
</div>

<Form
	{schema}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	let:isSubmitting
	let:values
	let:setValue
	let:isValid
	let:errors
>
	<div class="my-4 antialiased">
		<div class="flex-1 flex items-center justify-between">
			<div class="flex-1 px-4 py-2 text-sm">
				<p class="text-gray-900 font-semibold">Article Details</p>

				<div>
					<div class="px-4 pb-4">
						<div class="mt-4">
							<label for="url" class="block">
								<span class="text-gray-700">URL to Article</span>
							</label>
							<div class="relative">
								<span
									class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
								/>
							</div>
							<Input
								autofocus
								name="url"
								type="url"
								placeholder="E.g. https://that.us/blog/article"
								class="form-input block w-full mt-1 rounded-sm text-sm"
							/>
						</div>

						<div class="mt-4">
							<label for="description" class="block">
								<span class="text-gray-700"
									>Tell us what is of interesting and of value to someone else.</span
								>
							</label>
							<div class="relative">
								<span
									class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
								/>
							</div>
							<Input
								name="description"
								multiline
								rows="5"
								spellcheck="true"
								class="form-input block w-full mt-1 rounded-sm text-sm "
							/>
						</div>

						<div class="mt-4">
							<label for="tags" class="block">
								<span class="text-gray-700">Add some tags.</span>
								<div class="relative">
									<span
										class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
									/>
								</div>
								<div>
									<p class="mt-1 text-sm text-gray-400">
										Please add 5 or less 'tags' to help categorize this article. The return/enter is
										the delimiter between tags.
									</p>
								</div>
							</label>

							<div class="mt-4">
								<div class="w-full tag-form-input">
									<Tags
										tags={values.tags}
										name="tags"
										on:tags={({ detail }) => setValue('tags', detail.tags)}
										allowBlur={true}
										maxTags={5}
										onlyUnique={true}
										class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
									/>
								</div>
								{#if errors['tags']}
									<p class="text-red-600 italic">
										{errors['tags']}
									</p>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-12">
		<div class="flex justify-end">
			<button disabled={isSubmitting} type="submit">
				<Shell>
					<div class="px-8 py-2 text-sm leading-5 font-medium">Submit</div>
				</Shell>
			</button>
		</div>
	</div>

	{#if isValid === false}
		<ErrorNotificaiton message="Please correct the issues listed above." />
	{/if}

	{#if isSubmitting}
		<div class="flex flex-grow justify-center py-12">
			<div class="relative my-6 flex flex-col items-center space-y-6">
				<Circle3
					size={'60'}
					unit={'px'}
					ballTopLeft="#f74646"
					ballTopRight="#ff834d"
					ballBottomLeft="#26529A"
					ballBottomRight="#555555"
				/>
			</div>
		</div>
	{/if}
</Form>
