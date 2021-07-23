<script context="module">
  import * as yup from 'yup';

  const schema = yup.object().shape({
    firstName: yup.string().trim().required('Please add your first name.'),
    lastName: yup.string().trim().required('Please add your last name.'),
    email: yup.string().trim().required('Please add your email address.'),

    phone: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
  });
</script>

<script>
  export let handleSubmit;
  export let sharedProfile;

  import { Form, Input } from 'sveltejs-forms';

  import { Waiting } from '../../../../elements';
  import { Shell } from '../../../../elements/buttons';
</script>

<Form
  schema="{schema}"
  initialValues="{sharedProfile}"
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  let:isSubmitting
  let:isValid>
  <div>
    <div>
      <h2 class="text-xl leading-6 font-bold text-gray-900">
        Your Shared Profile
      </h2>

      <p class="mt-4 text-sm leading-5 text-gray-500">
        Your shared profile is an opportunity for you to change your primary
        profile information with information that you'd rather share with a
        sponsor.
      </p>

      <p class="mt-4 text-sm leading-5 text-gray-500">
        Below is the information we'll share with sponsors. By default it takes
        information from your main profile. Edit the fields below to change
        what's shared. This will not change the information on your main
        profile.
      </p>
    </div>

    <div class="px-4">
      <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="firstName"
            class="block text-sm font-medium leading-5 text-gray-700">
            First or Given Name
          </label>
          <div class="relative">
            <span
              class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400">
            </span>
          </div>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="firstName"
              type="text"
              autofocus
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="lastName"
            class="block text-sm font-medium leading-5 text-gray-700">
            Last or Family Name
          </label>
          <div class="relative">
            <span
              class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400">
            </span>
          </div>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="lastName"
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700">
            Email address
          </label>
          <div class="relative">
            <span
              class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400">
            </span>
          </div>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="email"
              type="email"
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="py-6 relative sm:col-span-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-2 bg-gray-100 text-sm text-gray-500">
              Optional Fields
            </span>
          </div>
        </div>

        <!-- <div class="sm:col-span-4">
          <label
            for="about"
            class="block text-sm font-medium leading-5 text-gray-700">
            Phone Number
          </label>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="phone"
              type="tel"
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div> -->

        <div class="sm:col-span-3">
          <label
            for="city"
            class="block text-sm font-medium leading-5 text-gray-700">
            City
          </label>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="city"
              type="text"
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="state"
            class="block text-sm font-medium leading-5 text-gray-700">
            State
          </label>
          <div class="mt-1 border rounded-md shadow-sm">
            <Input
              name="state"
              type="state"
              class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-5">
      <div class="flex justify-end space-x-4">
        <div class="flex">
          <Shell>
            <button
              type="submit"
              disabled="{isSubmitting}"
              class="w-full py-4 px-6 text-sm leading-5 font-medium">
              <span class="text-lg">Update</span>
            </button>
          </Shell>
        </div>
      </div>
    </div>
    <!-- 
    {#if isValid === false}
      <ErrorNotificaiton message="Please correct the errors listed above." />
    {/if} -->

    {#if isSubmitting}
      <div class="flex flex-grow justify-center py-12">
        <Waiting />
      </div>
    {/if}
  </div>
</Form>
