<script context="module">
	import * as yup from 'yup';

	const schema = yup.object().shape({
		takeaway: yup
			.string()
			.trim()
			.required('Please add something a geek should expect to learn during this activity.')
	});
</script>

<script>
	export let setField;
	export let initialData;

	import { onMount } from 'svelte';
	import { Input, Form } from 'sveltejs-forms';
	import { v4 as uuidv4 } from 'uuid';

	import { Shell as ShellButton } from '$elements/buttons';

	let items = initialData?.takeaways?.map((i) => ({ title: i, id: uuidv4() })) || [];

	$: addText = items.length > 0 ? 'Add Another' : 'Add';

	function updateField() {
		setField(
			'takeaways',
			items.map((i) => i.title)
		);
	}

	function handleSubmit({ detail: { values, resetForm } }) {
		const { takeaway } = values;

		const item = {
			title: takeaway.trim(),
			id: uuidv4()
		};

		items = [...items, item];

		updateField();

		resetForm();
		document.querySelector('#takeAwayInput').focus();
	}

	function removeItem(id) {
		items = items.filter((item) => item.id !== id);
		updateField();
	}

	function showBackground(i) {
		const result = i % 2;
		return result != 0;
	}

	onMount(() => {
		updateField();
	});
</script>

<div>
	<Form {schema} validateOnBlur={false} validateOnChange={false} on:submit={handleSubmit}>
		<div
			class="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 sm:items-center"
		>
			<div class="flex-grow">
				<Input
					id="takeAwayInput"
					name="takeaway"
					type="text"
					spellcheck="true"
					placeholder="E.g. Learn how to become more awesome."
					class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
				/>
			</div>
			<div class="flex-none">
				<ShellButton>
					<button class="w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium" type="submit">
						{addText}
					</button>
				</ShellButton>
			</div>
		</div>
	</Form>

	<div>
		<ul>
			{#each items as item, i (item.id)}
				<li class="pt-4">
					<div class="flex space-x-4 items-center">
						<div class="flex-grow p-2 rounded-md" class:bg-gray-50={showBackground(i)}>
							<span>{item.title}</span>
						</div>

						<div class="flex-none">
							<ShellButton>
								<button
									type="button"
									on:click={() => removeItem(item.id)}
									class="w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium "
								>
									Remove
								</button>
							</ShellButton>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
