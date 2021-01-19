<script>
  export let handleSubmit;
  import { Form, Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import * as yup from 'yup';

  import { Waiting } from '../../elements';
  import ErrorNotificaiton from '../../components/notifications/Error.svelte';

  let initialValues = {
    ticketReference: undefined,
  };

  const schema = yup.object().shape({
    ticketReference: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9]{4}-[0-9]$/, {
        message: 'Invalid ticket reference number format.',
      })
      .required(
        'You must enter a ticket reference number to claim your merit badge.',
      ),
  });

  const handleReset = () => {
    profile = {};
  };
</script>

<Form
  schema="{schema}"
  initialValues="{initialValues}"
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  on:reset="{handleReset}"
  let:isSubmitting
  let:isValid
  let:errors
  let:touched
>
  <div>
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Claim your ticket!
        </h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          Earn your merit badge today! Enter your ticket reference number below
          and claim your merit badge today.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-y-4 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="ticket_reference"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Ticket Reference Number
          </label>
          <div class="mt-1">
            <Input
              type="text"
              name="ticketReference"
              placeholder="A1RC-1"
              class="form-input block w-full border rounded-md transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-5">
      <div class="flex justify-end">
        <span class="inline-flex rounded-md shadow-sm">
          <button
            type="reset"
            class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5
            font-medium text-gray-700 hover:text-gray-500 focus:outline-none
            focus:border-blue-300 focus:ring-blue active:bg-gray-50
            active:text-gray-800 transition duration-150 ease-in-out"
          >
            Reset
          </button>
        </span>
        <span class="ml-3 inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            disabled="{isSubmitting}"
            class="inline-flex justify-center py-2 px-4 border
            border-transparent text-sm leading-5 font-medium rounded-md
            text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
            focus:border-indigo-700 focus:ring-indigo
            active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Claim Ticket
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
