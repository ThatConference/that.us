<script>
  export let handleSubmit;

  import dayjs from 'dayjs';
  import { Circle2 } from 'svelte-loading-spinners';
  import { Form, Input, Select, Choice } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';

  import { Waiting } from '../../elements';
  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  console.log({ $user });
  let initialValues = {
    firstName: $user.given_name || $user.firstName,
    lastName: $user.family_name || $user.lastName,
    email: $user.email,
    profileSlug: $user.nickname,
  };

  console.log({ initialValues });

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    bio: yup.string().required(),
  });

  function handleReset() {
    initialValues = {};
  }
</script>

<!--
accpetedCodeOfConduct
acceptedTermsOfService
canFeature: true
isOver13: true
-->

<Form
  {schema}
  {initialValues}
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  on:reset="{handleReset}"
  let:isSubmitting
  let:isValid
  let:setValue
>

  <div>
    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">INTRO COPY</p>
  </div>

  <div class="mt-6 sm:mt-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
      sm:border-gray-200 sm:pt-5"
    >

      <label
        for="users_firstName"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
        sm:pt-2"
      >
        What's your first name or given name?
      </label>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
          <Input
            name="firstName"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 sm:mt-5">
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
        sm:border-gray-200 sm:pt-5"
      >

        <label
          for="users_lastName"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          What's your last name or family name?
        </label>

        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
            <Input
              name="lastName"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-5">
        <div
          class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
          sm:border-gray-200 sm:pt-5"
        >

          <label
            for="users_email"
            class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
            sm:pt-2"
          >
            What's your email address?
          </label>

          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
              <Input
                name="email"
                class="form-input block w-full transition duration-150
                ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>

        <div
          class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
          sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <label
            for="session_shortDescription"
            class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
            sm:pt-2"
          >
            Tell us a bit about yourself, a short bio?
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
              <Input
                name="bio"
                multiline="{true}"
                class="form-input block w-full transition duration-150
                ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 sm:mt-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
            sm:border-gray-200 sm:pt-5"
          >

            <label
              for="users_slug"
              class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
              sm:pt-2"
            >
              Profile Slug?
            </label>

            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                <Input
                  name="profileSlug"
                  class="form-input block w-full transition duration-150
                  ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
              sm:border-gray-200 sm:pt-5"
            >

              <label
                for="users_email"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Checkbox #1
              </label>

              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg sm:max-w-xs">
                  <Input
                    name=""
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition
                    duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
              sm:border-gray-200 sm:pt-5"
            >

              <label
                for="users_email"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Checkbox #1
              </label>

              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg sm:max-w-xs">
                  <Input
                    name=""
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition
                    duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
              sm:border-gray-200 sm:pt-5"
            >

              <label
                for="users_email"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Checkbox #1
              </label>

              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg sm:max-w-xs">
                  <Input
                    name=""
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition
                    duration-150 ease-in-out"
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
                  class="py-2 px-4 border border-gray-300 rounded-md text-sm
                  leading-5 font-medium text-gray-700 hover:text-gray-500
                  focus:outline-none focus:border-blue-300
                  focus:shadow-outline-blue active:bg-gray-50
                  active:text-gray-800 transition duration-150 ease-in-out"
                >
                  Reset Form
                </button>
              </span>

              <span class="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled="{isSubmitting}"
                  class="inline-flex justify-center py-2 px-4 border
                  border-transparent text-sm leading-5 font-medium rounded-md
                  text-white bg-indigo-600 hover:bg-indigo-500
                  focus:outline-none focus:border-indigo-700
                  focus:shadow-outline-indigo active:bg-indigo-700 transition
                  duration-150 ease-in-out"
                >
                  Add Me!
                </button>
              </span>
            </div>
          </div>

          {#if isSubmitting}
            <div class="flex flex-grow justify-center py-12">
              <Waiting />
            </div>
          {/if}

        </div>
      </div>
    </div>
  </div>
</Form>
