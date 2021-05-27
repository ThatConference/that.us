<script context="module">
  import * as yup from 'yup';

  const schema = yup.object().shape({
    emailAddress: yup
      .string()
      .email()
      .trim()
      .required('Please enter your email address.'),
    orderId: yup.string().required('Please enter your email address.'),
    allocationId: yup.string().required('Please enter your email address.'),
  });
</script>

<script>
  export let allocation;
  export let orderId;

  import { getClient } from '@urql/svelte';
  import { Link, navigateTo } from 'yrv';
  import Icon from 'svelte-awesome';
  import { share, refresh } from 'svelte-awesome/icons';
  import { Form, Input } from 'sveltejs-forms';

  import { Shell as ShellButton } from '../../../elements/buttons';
  import orderMutationApi from '../../../dataSources/api.that.tech/orders/mutations';

  let initialValues = {
    orderId,
    allocationId: allocation.id,
  };

  let hasError, errorMessage;
  let { event, product } = allocation;
  let { allocateTicket } = orderMutationApi(getClient());

  let allocatedTo = '';
  let isAllocated = allocation.isAllocated;

  if (allocation.isAllocated) {
    allocatedTo = `${allocation.allocatedTo.firstName} ${allocation.allocatedTo.lastName}`;
  }

  async function handleSubmit({ detail: { values, resetForm } }) {
    const { emailAddress, orderId, allocationId } = values;
    const r = await allocateTicket(orderId, allocationId, emailAddress);

    hasError = !r.result;
    isAllocated = r.result;
    errorMessage = r.message;

    if (r.result)
      allocatedTo = `${r.allocatedTo.firstName} ${r.allocatedTo.lastName}`;
  }
</script>

<Form
  schema="{schema}"
  initialValues="{initialValues}"
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  let:isValid>
  <Input name="orderId" type="text" hidden />
  <Input name="allocationId" type="text" hidden />

  <div
    class="flex flex-col space-y-2 md:space-y-0 md:grid gap-4 grid-cols-7 place-content-center px-4 py-6 sm:px-6">
    <div class="col-span-2">
      <p class="text-sm font-medium text-thatBlue-700 truncate">
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
        <div class="h-12 flex flex-col justify-center">
          <div>
            <span class="italic text-gray-500"> allocated to: </span>
            <span class="font-semibold">
              {allocatedTo}
            </span>
          </div>
        </div>
      {:else}
        <div class="rounded shadow-lg">
          <Input
            type="email"
            name="emailAddress"
            class="form-input block h-12 w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
        </div>
      {/if}
    </div>

    <div class="col-span-2">
      {#if isAllocated}
        <ShellButton>
          <Link
            on:click="{() => (isAllocated = false)}"
            class="text-center w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium ">
            <span>
              <Icon data="{refresh}" class="-ml-1 mr-2 h-4 w-4" />
            </span>
            Re-Transfer
          </Link>
        </ShellButton>
      {:else}
        <ShellButton>
          <button
            type="submit"
            class="text-center w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium ">
            <span>
              <Icon data="{share}" class="-ml-1 mr-2 h-4 w-4" />
            </span>
            Transfer Ticket
          </button>
        </ShellButton>
      {/if}
    </div>
  </div>
  <div
    class="p-4 flex flex-col items-center justify-center text-red-500"
    class:hidden="{!hasError}">
    {errorMessage}
  </div>
</Form>