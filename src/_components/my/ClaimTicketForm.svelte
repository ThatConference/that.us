<script>
	export let handleSubmit;
	import { Form, Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
	import * as yup from 'yup';

	import { Waiting } from '$elements';
	import ErrorNotificaiton from '$components/notifications/Error.svelte';

	let initialValues = {
		ticketReference: undefined
	};

	const schema = yup.object().shape({
		ticketReference: yup
			.string()
			.trim()
			.matches(/^[a-zA-Z0-9]{4}-[0-9]$/, {
				message: 'Invalid ticket reference number format.'
			})
			.required('You must enter a ticket reference number to claim your merit badge.')
	});
</script>

<Form
	{schema}
	{initialValues}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	let:isSubmitting
	let:isValid
>
	<div>
		<div>
			<div>
				<h3 class="text-lg font-medium leading-6 text-gray-900">Claim your ticket!</h3>
				<p class="mt-1 text-sm leading-5 text-gray-500">
					Earn your merit badge today! Enter your ticket reference number below and claim your merit
					badge today.
				</p>
			</div>

			<div class="mt-6 grid grid-cols-1 gap-y-6 gap-y-4 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="ticket_reference" class="block text-sm font-medium leading-5 text-gray-700">
						Ticket Reference Number
					</label>
					<div class="mt-1">
						<Input
							type="text"
							name="ticketReference"
							placeholder="A1RC-1"
							class="form-input block w-full rounded-md border transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-200 pt-5">
			<div class="flex justify-end space-x-4">
				<span class="inline-flex rounded-md shadow-sm">
					<button
						type="submit"
						disabled={isSubmitting}
						class="inline-flex justify-center rounded-md border-2 border-thatBlue-500
              bg-white py-2 px-4 text-sm font-medium
              leading-5 text-thatBlue-500 transition duration-150
              ease-in-out hover:bg-thatBlue-500
              hover:text-white focus:border-thatBlue-800 focus:bg-thatBlue-500
              focus:text-white focus:outline-none focus:ring-thatBlue-500 active:bg-thatBlue-800"
					>
						Claim Ticket
					</button>
				</span>
				<span class="inline-flex rounded-md shadow-sm">
					<button
						type="reset"
						tabindex="-1"
						class="focus:ring-blue rounded-md border-2 border-gray-300 py-2 px-4
              text-sm font-medium leading-5 text-gray-700
              transition duration-150 ease-in-out
              hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50
              active:text-gray-800"
					>
						Reset
					</button>
				</span>
			</div>
		</div>

		{#if isValid === false}
			<ErrorNotificaiton message="Please correct the errors listed above." />
		{/if}

		{#if isSubmitting}
			<div class="flex flex-grow justify-center py-12">
				<Waiting />
			</div>
		{/if}
	</div>
</Form>
