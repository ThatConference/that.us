<script context="module">
	import * as yup from 'yup';

	const schema = yup.object().shape({
		fullName: yup.string().trim().required('Please enter the full name of your contact.'),
		email: yup.string().trim().required('Please enter an email address to reach them at.'),
		phoneNumber: yup
			.string()
			.trim()
			.matches(
				/^\+[1-9]\d{10,14}$/,
				'Phone number must be in the following format (E.g. +13476748428)'
			)
			.required('Please enter a phone number we can reach them at.'),
		relationship: yup.string().trim().required('What is their relationship to you?'),
		travelingWithYou: yup.boolean().required('Are they traveling with you?')
	});
</script>

<script>
	import { createEventDispatcher } from 'svelte';
	import { Form, Input } from 'sveltejs-forms';
	import Select from 'svelte-select';

	import ErrorNotificaiton from '$components/notifications/Error.svelte';
	import { Shell } from '$elements/buttons';

	const dispatch = createEventDispatcher();

	function handleSubmit({ detail: { values, setSubmitting } }) {
		setSubmitting(true);

		dispatch('submit-step', values);

		setSubmitting(false);
	}
</script>

<div class="space-y-4">
	<slot name="header" />

	<p class="pt-2 prose prose-lg text-gray-500">
		Sometimes things happen. Like any good scout we'd like to make sure we're prepared too. Please
		let us know who we should contact in the unforseen event of an emergency.
	</p>
</div>

<Form
	{schema}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	let:isSubmitting
	let:setValue
	let:errors
	let:touched
	let:isValid
>
	<div class="mt-12">
		<h2 class="text-xl text-gray-800 font-extrabold">
			Please fill out the appropiate emergency contact information.
		</h2>
		<p class="pt-2 text-gray-500">Who would you like us to contact in the event of an emergency?</p>

		<div class="bg-gray-50 antialiased mt-6">
			<div class="flex-1 flex items-center justify-between border rounded-sm">
				<div class="flex-1 px-4 py-2 text-sm">
					<p class="text-gray-900 font-semibold">Emergency Contact</p>

					<div>
						<div class="px-4 pb-4">
							<div class="mt-4">
								<label for="fullName" class="block">
									<span class="text-gray-700">Full Name</span>
								</label>
								<div class="relative">
									<span
										class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
									/>
								</div>
								<Input
									autofocus
									name="fullName"
									type="text"
									required
									placeholder="E.g. Clark Sell"
									class="form-input block w-full mt-1 rounded-sm text-sm"
								/>
							</div>

							<div class="mt-4">
								<label for="phoneNumber" class="block">
									<span class="text-gray-700"
										>What is the best number to contact them at? (E.g. +13476748428)</span
									>
								</label>
								<div class="relative">
									<span
										class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
									/>
								</div>
								<Input
									name="phoneNumber"
									type="tel"
									class="form-input block w-full mt-1 rounded-sm text-sm "
									required
									placeholder="E.g. +13476748428"
								/>
							</div>

							<div class="mt-4">
								<label for="email" class="block">
									<span class="text-gray-700">What is their email address?</span>
								</label>
								<Input
									name="email"
									type="email"
									placeholder="E.g. hello@that.us"
									size="30"
									required
									class="form-input block w-full mt-1 rounded-sm text-sm"
								/>
							</div>

							<div class="mt-4">
								<label for="relationship" class="block">
									<span class="text-gray-700">What is their relationship to you?</span>
								</label>
								<div class="relative">
									<span
										class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
									/>
								</div>
								<Select
									inputAttributes={{ name: 'relationship' }}
									items={[
										{ label: 'Spouse', value: 'Spouse' },
										{ label: 'Parent', value: 'Parent' },
										{ label: 'Kid', value: 'Kid' },
										{ label: 'Other', value: 'Other' }
									]}
									on:select={({ detail }) => setValue('relationship', detail.value)}
									hasError={touched['relationship'] && errors['relationship']}
									inputStyles="form-multiselect transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:border-gray-700"
								/>

								{#if touched['relationship'] && errors['relationship']}
									<p class="text-red-600 italic">{errors['relationship']}</p>
								{/if}
							</div>

							<div class="mt-4">
								<label for="travelingWithYou" class="block">
									<span class="text-gray-700">Are they traveling with you?</span>
								</label>
								<div class="relative">
									<span
										class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
									/>
								</div>
								<Select
									inputAttributes={{ name: 'travelingWithYou' }}
									items={[
										{ label: 'No', value: false },
										{ label: 'Yes', value: true }
									]}
									on:select={({ detail }) => setValue('travelingWithYou', detail.value)}
									hasError={touched['travelingWithYou'] && errors['travelingWithYou']}
									inputStyles="form-multiselect transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:border-gray-700"
								/>
								{#if touched['travelingWithYou'] && errors['travelingWithYou']}
									<p class="text-red-600 italic">{errors['travelingWithYou']}</p>
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
					<div class="px-8 py-2 font-extrabold">Next, Campsite</div>
				</Shell>
			</button>
		</div>
	</div>

	{#if isValid === false}
		<ErrorNotificaiton message="Please correct the issues listed above." />
	{/if}
</Form>
