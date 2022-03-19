<script context="module">
	import * as yup from 'yup';

	const schema = yup.object().shape({
		emailAddress: yup.string().email().trim().required('Please enter your email address.'),
		orderId: yup.string().required('orderId is missing.'),
		allocationId: yup.string().required('allocationId is missing.')
	});
</script>

<script>
	export let allocation;
	export let orderId;

	import Icon from 'svelte-awesome';
	import { share, refresh } from '$components/svelte-awesome-icons';
	import { Form, Input } from 'sveltejs-forms';

	import { Shell as ShellButton } from '$elements/buttons';
	import orderMutationApi from '$dataSources/api.that.tech/orders/mutations';

	let initialValues = {
		orderId,
		allocationId: allocation.id
	};

	let hasError, errorMessage;
	let { event, product } = allocation;
	let { allocateTicket } = orderMutationApi();

	let allocatedTo = '';
	let isAllocated = allocation.isAllocated;

	if (allocation.isAllocated) {
		allocatedTo = `${allocation.allocatedTo.firstName} ${
			allocation.allocatedTo.lastInitial || allocation.allocatedTo.lastName
		}`;
	}

	async function handleSubmit({ detail: { values } }) {
		const { emailAddress, orderId, allocationId } = values;
		const r = await allocateTicket(orderId, allocationId, emailAddress);

		hasError = !r.result;
		isAllocated = r.result;
		errorMessage = r.message;

		if (r.result)
			allocatedTo = `${r.allocatedTo.firstName} ${
				r.allocatedTo.lastInitial || r.allocatedTo.lastName
			}`;
	}
</script>

<Form
	{schema}
	{initialValues}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	let:isValid>
	<Input name="orderId" type="text" hidden />
	<Input name="allocationId" type="text" hidden />

	<div
		class="flex grid-cols-7 flex-col place-content-center gap-4 space-y-2 px-4 py-6 sm:px-6 md:grid md:space-y-0">
		<div class="col-span-2">
			<p class="truncate text-sm font-medium text-thatBlue-700">
				{product.name}
			</p>

			<p class="mt-2 flex items-center text-sm text-gray-500">
				{#if product.ticketType !== 'MEMBERSHIP'}
					<span class="truncate">{event.name}</span>
				{/if}
			</p>
		</div>

		<div class="col-span-3">
			{#if isAllocated}
				<div class="flex h-12 flex-col justify-center">
					<div>
						<span class="italic text-gray-500"> allocated to: </span>
						<span class="font-semibold">
							{allocatedTo}
						</span>
					</div>
				</div>
			{:else}
				<div>
					<Input
						type="email"
						name="emailAddress"
						placeholder="E.g. hello@that.us"
						class="form-input block h-12 w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
				</div>
			{/if}
		</div>

		<div class="col-span-2">
			{#if isAllocated}
				<ShellButton>
					<button
						on:click={() => (isAllocated = false)}
						class="w-full px-8 py-1 text-center text-sm font-medium leading-5 md:px-10 ">
						<span>
							<Icon data={refresh} class="-ml-1 mr-2 h-4 w-4" />
						</span>
						Re-Transfer
					</button>
				</ShellButton>
			{:else}
				<button
					type="submit"
					class="text-center w-full h-full bg-white rounded-md shadow 
          border-2 border-thatBlue-500
          text-base leading-6 md:text-lg font-medium text-thatBlue-500 
          hover:bg-thatBlue-500 hover:text-white 
          focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500 focus:border-thatBlue-800 
          transition duration-150 ease-in-out">
					<span>
						<Icon data={share} class="-ml-1 mr-2 h-4 w-4" />
					</span>
					Transfer Ticket
				</button>
			{/if}
		</div>
	</div>
	<div class="flex flex-col items-center justify-center p-4 text-red-500" class:hidden={!hasError}>
		{errorMessage}
	</div>
</Form>
