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
        <div class="rounded-md shadow-sm">
          <Input
            name="firstName"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
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
        <div class="rounded-md shadow-sm">
          <Input
            name="lastName"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
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
        <div class="rounded-md shadow-sm">
          <Input
            name="email"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
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
        <div class="rounded-md shadow-sm">
          <Input
            name="bio"
            multiline="{true}"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
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
        <div class="rounded-md shadow-sm">
          <Input
            name="profileSlug"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
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
        <Checkbox
          name="codeOfConduct"
          on:change="{({ detail }) => setValue('codeOfConduct', detail)}"
          size="2.5rem"
        />
        {#if touched['codeOfConduct'] && errors['codeOfConduct']}
          <p>{errors['codeOfConduct']}</p>
        {/if}
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
        <Checkbox
          name="termsOfService"
          on:change="{({ detail }) => setValue('termsOfService', detail)}"
          size="2.5rem"
        />

        {#if touched['termsOfService'] && errors['termsOfService']}
          <p>{errors['termsOfService']}</p>
        {/if}

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
        <Checkbox
          name="usersAge"
          on:change="{({ detail }) => setValue('usersAge', detail)}"
          size="2.5rem"
        />
        {#if touched['usersAge'] && errors['usersAge']}
          <p>{errors['usersAge']}</p>
        {/if}
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
      <div slot="input" class="centerGridItem">
        <Checkbox
          name="publicProfile"
          on:change="{({ detail }) => setValue('publicProfile', detail)}"
          size="2.5rem"
        />

        {#if touched['publicProfile'] && errors['publicProfile']}
          <p>error</p>
        {/if}

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
