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

	const yesNoDropDown = [
		{ label: 'No', value: false },
		{ label: 'Yes', value: true }
	];
</script>

<script>
	export let handleSubmit;
	export let emergencyContactInformation;
	import Select from 'svelte-select';

	import { Form, Input } from 'sveltejs-forms';
	import ErrorNotificaiton from '$components/notifications/Error.svelte';

	import { Waiting } from '$elements';
	import { Shell } from '$elements/buttons';

	let relationshipSelect = emergencyContactInformation.relationship;
	let travelingWithYouSelect =
		yesNoDropDown.find((i) => i.value === emergencyContactInformation?.travelingWithYou) ||
		undefined;
</script>

<div>
	<h2 class="text-xl leading-6 font-bold text-gray-900">Your Emergency Contact Information</h2>

	<div class="text-gray-500 text-sm leading-5">
		<p class="my-4">
			Sometimes things happen. Like any good scout we'd like to make sure we're prepared too. Please
			let us know who we should contact in the unforseen event of an emergency.
		</p>
	</div>
</div>

<Form
	{schema}
	initialValues={emergencyContactInformation}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	let:isSubmitting
	let:setValue
	let:errors
	let:touched
	let:isValid
>
	<div class="my-4 antialiased">
		<div class="flex-1 flex items-center justify-between">
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
								<Input
									name="email"
									type="email"
									placeholder="E.g. hello@that.us"
									size="30"
									required
									class="form-input block w-full mt-1 rounded-sm text-sm"
								/>
							</label>
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
								bind:value={relationshipSelect}
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
								items={yesNoDropDown}
								on:select={({ detail }) => setValue('travelingWithYou', detail.value)}
								bind:value={travelingWithYouSelect}
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

	<div class="mt-12">
		<div class="flex justify-end">
			<button disabled={isSubmitting} type="submit">
				<Shell>
					<div class="px-8 py-2 text-sm leading-5 font-medium">Update Contact Information</div>
				</Shell>
			</button>
		</div>
	</div>

	{#if isValid === false}
		<ErrorNotificaiton message="Please correct the issues listed above." />
	{/if}

	{#if isSubmitting}
		<div class="flex flex-grow justify-center py-12">
			<Waiting />
		</div>
	{/if}
</Form>
