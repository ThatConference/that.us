<script>
  export let handleSubmit;

  import dayjs from 'dayjs';
  import { Circle2 } from 'svelte-loading-spinners';
  import { Form, Input, Select, Choice } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';
  import { Link } from 'yrv';
  import Checkbox from 'svelte-checkbox';

  import FormItem from './FormItem.svelte';
  import { Waiting } from '../../elements';
  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  console.log($user);

  let initialValues = {
    firstName: $user.given_name || $user.firstName,
    lastName: $user.family_name || $user.lastName,
    email: $user.email,
    profileSlug: $user.nickname,
    bio: undefined,
    codeOfConduct: false,
    termsOfService: false,
    usersAge: false,
    publicProfile: false,
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required('With out this how will we know who you are?'),
    lastName: yup
      .string()
      .trim()
      .required('With out this how will we know who you are?'),
    email: yup
      .string()
      .trim()
      .required(
        'yes we need an email address. we will be the only one who uses it.',
      ),
    bio: yup.string().required('we need a short bio'),
    profileSlug: yup
      .string()
      .lowercase()
      .required('You must enter a profile slug.'),
    codeOfConduct: yup
      .boolean()
      .oneOf([true], 'You Must Accept our Code of Conduct.'),
    termsOfService: yup
      .boolean()
      .oneOf([true], 'You Must Accept Terms of Services.'),
    usersAge: yup.boolean().oneOf([true], 'You Must be 13 years or older.'),
    publicProfile: yup.boolean(),
  });
</script>

<Form
  {schema}
  {initialValues}
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  let:isSubmitting
  let:isValid
  let:setValue
  let:errors
  let:touched
>
  <div>
    <div>

      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Member Page Slug
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span
              class="inline-flex items-center px-3 rounded-l-md border
              border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
            >
              https://thatconference.com/member/
            </span>
            <Input
              name="profileSlug"
              class="flex-1 form-input block w-full min-w-0 rounded-none
              rounded-r-md transition duration-150 ease-in-out sm:text-sm
              sm:leading-5"
            />
          </div>
        </div>

        <div class="sm:col-span-6">
          <label
            for="about"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            About Yourself
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              type="textarea"
              rows="3"
              name="bio"
              multiline="{true}"
              class="form-textarea block w-full transition duration-150
              ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Write a few sentences about yourself.
          </p>
        </div>

        <div class="sm:col-span-6">
          <label
            for="photo"
            class="block text-sm leading-5 font-medium text-gray-700"
          >
            Profile Photo
          </label>

          <div class="mt-2 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                class="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0
                  9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018
                  0z"
                ></path>
              </svg>
            </span>
            <span class="ml-5 rounded-md shadow-sm">
              <button
                type="button"
                class="py-2 px-3 border border-gray-300 rounded-md text-sm
                leading-4 font-medium text-gray-700 hover:text-gray-500
                focus:outline-none focus:border-blue-300
                focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800
                transition duration-150 ease-in-out"
              >
                Upload / Update
              </button>
            </span>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label
            for="photo"
            class="block text-sm leading-5 font-medium text-gray-700"
          >
            Public Profile
          </label>

          <div class=" mt-2 flex items-center items-start">

            <Checkbox
              name="publicProfile"
              on:change="{({ detail }) => setValue('publicProfile', detail)}"
              size="2.5rem"
            />

            <div class="ml-3 text-sm leading-5">
              <label for="comments" class="font-medium text-gray-700">
                Make your profile public.
              </label>
              <p class="text-gray-500">will you accept... link here</p>
            </div>

            {#if touched['publicProfile'] && errors['publicProfile']}
              <p>error</p>
            {/if}

          </div>
        </div>

      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-8">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Personal Information
        </h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          Use a permanent address where you can receive mail.
        </p>
      </div>
      <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="first_name"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            First name
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              name="firstName"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="last_name"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Last name
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              name="lastName"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Email address
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              name="email"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-8">

      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Terms of Service
        </h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          so much stuff to say here....
        </p>
      </div>

      <div class="mt-6">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">
            Do you agree too
          </legend>

          <div class="mt-4">
            <div class="relative flex items-center items-start">

              <Checkbox
                name="codeOfConduct"
                on:change="{({ detail }) => setValue('codeOfConduct', detail)}"
                size="2.5rem"
              />

              <div class="ml-3 text-sm leading-5">
                <label for="comments" class="font-medium text-gray-700">
                  Code of Conduct
                </label>
                <p class="text-gray-500">will you accept... link here</p>
              </div>

              {#if touched['codeOfConduct'] && errors['codeOfConduct']}
                <p>{errors['codeOfConduct']}</p>
              {/if}

            </div>

            <div class="mt-4">
              <div class="relative flex items-center items-start">

                <Checkbox
                  name="termsOfService"
                  on:change="{({ detail }) => setValue('termsOfService', detail)}"
                  size="2.5rem"
                />

                <div class="ml-3 text-sm leading-5">
                  <label for="candidates" class="font-medium text-gray-700">
                    Terms of Service
                  </label>
                  <p class="text-gray-500">blaaa blaaa link....</p>
                </div>
              </div>

              {#if touched['termsOfService'] && errors['termsOfService']}
                <p>{errors['termsOfService']}</p>
              {/if}

            </div>

            <div class="mt-4">
              <div class="relative flex items-center items-start">

                <Checkbox
                  name="usersAge"
                  on:change="{({ detail }) => setValue('usersAge', detail)}"
                  size="2.5rem"
                />

                <div class="ml-3 text-sm leading-5">
                  <label for="offers" class="font-medium text-gray-700">
                    Over the age of 13
                  </label>
                  <p class="text-gray-500">bllaaa.</p>
                </div>
              </div>

              {#if touched['usersAge'] && errors['usersAge']}
                <p>{errors['usersAge']}</p>
              {/if}

            </div>
          </div>
        </fieldset>

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
          focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50
          active:text-gray-800 transition duration-150 ease-in-out"
        >
          Cancel
        </button>
      </span>
      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          disabled="{isSubmitting}"
          class="inline-flex justify-center py-2 px-4 border border-transparent
          text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          duration-150 ease-in-out"
        >
          Save
        </button>
      </span>
    </div>
  </div>

  {#if isSubmitting}
    <div class="flex flex-grow justify-center py-12">
      <Waiting />
    </div>
  {/if}

</Form>
