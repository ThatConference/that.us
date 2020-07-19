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

  let initialValues = {
    firstName: $user.given_name || $user.firstName,
    lastName: $user.family_name || $user.lastName,
    email: $user.email,
    profileSlug: $user.nickname,
    bio: undefined,
    profileSlug: undefined,
    codeOfConduct: false,
    termsOfService: false,
    usersAge: false,
    publicProfile: false,
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required(),
    lastName: yup
      .string()
      .trim()
      .required(),
    email: yup
      .string()
      .trim()
      .required(),
    bio: yup.string().required(),
    profileSlug: yup
      .string()
      .lowercase()
      .required(),
    codeOfConduct: yup
      .boolean()
      .oneOf([true], 'You Must Accept our Code of Conduct.'),
    termsOfService: yup
      .boolean()
      .oneOf([true], 'You Must Accept Terms of Services.'),
    usersAge: yup.boolean().oneOf([true], 'You Must be 13 years or older.'),
    publicProfile: yup.boolean(),
  });

  function handleReset(foo) {
    console.log({ publicProfile });
  }
</script>

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

    <!-- Users first name -->
    <FormItem>
      <div slot="label">
        <label
          for="users_firstName"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          What's your first name or given name?
        </label>
      </div>
      <div slot="input">
        <Input
          name="firstName"
          class="form-input block w-full transition duration-150 ease-in-out
          sm:text-sm sm:leading-5"
        />
      </div>
    </FormItem>

    <!-- Users Last Name -->
    <FormItem>
      <div slot="label">
        <label
          for="users_lastName"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          What's your last name or family name?
        </label>
      </div>
      <div slot="input">
        <Input
          name="lastName"
          class="form-input block w-full transition duration-150 ease-in-out
          sm:text-sm sm:leading-5"
        />
      </div>
    </FormItem>

    <!-- Users Email Address -->
    <FormItem>
      <div slot="label">
        <label
          for="users_email"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          What's your email address?
        </label>
      </div>
      <div slot="input">
        <Input
          name="email"
          class="form-input block w-full transition duration-150 ease-in-out
          sm:text-sm sm:leading-5"
        />
      </div>
    </FormItem>

    <!-- User's Bio -->
    <FormItem>
      <div slot="label">
        <label
          for="users_bio"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          Tell us a bit about yourself. Just a short bio so others know a bit
          more about you.
        </label>
      </div>
      <div slot="input">
        <Input
          name="bio"
          multiline="{true}"
          class="form-input block w-full transition duration-150 ease-in-out
          sm:text-sm sm:leading-5"
        />
      </div>
    </FormItem>

    <!-- profile slug -->
    <FormItem>
      <div slot="label">
        <label
          for="users_slug"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          Profile Slug?
        </label>
      </div>
      <div slot="input">
        <Input
          name="profileSlug"
          class="form-input block w-full transition duration-150 ease-in-out
          sm:text-sm sm:leading-5"
        />
      </div>
    </FormItem>

    <FormItem>
      <div slot="label">
        <label
          for="users_codeOfConduct"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          Will you abide by our
          <Link
            class="font-medium text-indigo-600 hover:text-indigo-500 transition
            ease-in-out duration-150"
            href="https://www.thatconference.com/"
            open
            value="{true}"
          >
            Code of Conduct?
          </Link>
        </label>

      </div>
      <div slot="input">
        <!-- 
        <Checkbox
          name="codeOfConduct"
          bind:checked="{codeOfConduct}"
          on:change="{({ detail }) => setValue('codeOfConduct', detail)}"
          class="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        /> -->

        <Input
          name="codeOfConduct"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
          ease-in-out"
        />

      </div>
    </FormItem>

    <FormItem>
      <div slot="label">
        <label
          for="users_termsOfService"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          Do you accept our
          <Link
            class="font-medium text-indigo-600 hover:text-indigo-500 transition
            ease-in-out duration-150"
            href="https://www.thatconference.com/"
            open
          >
            Terms of Service?
          </Link>

        </label>

      </div>
      <div slot="input">
        <!-- <Checkbox
          name="termsOfService"
          on:clear="{() => setValue('termsOfService', false)}"
          bind:this="{termsOfService}"
          class="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        /> -->
        <Input
          name="termsOfService"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
          ease-in-out"
        />
      </div>
    </FormItem>

    <FormItem>
      <div slot="label">
        <label
          for="users_age"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          Are you over the age of 13?
        </label>

      </div>
      <div slot="input">
        <!-- <Checkbox
          name="usersAge"
          on:change="{({ detail }) => setValue('usersAge', detail)}"
          bind:this="{usersAge}"
          class="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        /> -->

        <Input
          name="usersAge"
          type="checkbox"
          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
          ease-in-out"
        />

        <Choice
          name="usersAge"
          options="{[true]}"
          single
          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
          ease-in-out"
        />

      </div>
    </FormItem>

    <FormItem>
      <div slot="label">
        <label
          for="users_publicProfile"
          class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
        >
          <p>Would you like your profile to be public?</p>
          <p>We only list a subset of things... blaa blaa.</p>
          <p>
            but to submit a session you will have to have a "public profile".
          </p>
        </label>

      </div>
      <div slot="input">

        <!-- <Checkbox
          name="publicProfile"
          on:change="{({ detail }) => setValue('publicProfile', detail)}"
          class="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          bind:checked="{publicProfile}"
        /> -->
        <Input
          name="publicProfile"
          type="checkbox"
          on:change="{({ detail }) => setValue('publicProfile', detail.publicProfile)}"
          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150
          ease-in-out"
        />

      </div>
    </FormItem>

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
            Reset Form
          </button>
        </span>

        <span class="ml-3 inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            disabled="{isSubmitting}"
            class="inline-flex justify-center py-2 px-4 border
            border-transparent text-sm leading-5 font-medium rounded-md
            text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
            focus:border-indigo-700 focus:shadow-outline-indigo
            active:bg-indigo-700 transition duration-150 ease-in-out"
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
</Form>
