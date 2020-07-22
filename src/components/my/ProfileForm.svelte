<script>
  export let handleSubmit;
  export let profile;
  export let isNewProfile;

  import dayjs from 'dayjs';
  import { Circle2 } from 'svelte-loading-spinners';
  import { Form, Input, Select, Choice } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';
  import { Link } from 'yrv';
  import Checkbox from 'svelte-checkbox';
  import { getClient } from '@urql/svelte';
  import fetch from 'isomorphic-unfetch';
  import { ScaleOut } from 'svelte-loading-spinners';

  import config from '../../config';
  import memberApi from '../../dataSources/api.that.tech/members.js';

  import { Waiting } from '../../elements';
  import { isAuthenticated, token } from '../../utilities/security.js';

  const { isSlugTaken } = memberApi(getClient());
  let initialValues;
  let profileImageUploading;
  let profileImageUrl;

  if (isNewProfile) {
    initialValues = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profileSlug: undefined,
      company: undefined,
      jobTitle: undefined,
      bio: undefined,
      canFeature: false,
      isOver13: false,
      acceptedCodeOfConduct: false,
      acceptedTermsOfService: false,
      acceptedAntiHarassmentPolicy: false,
      acceptedCommitmentToDiversity: false,
      isDeactivated: false,
      profileImage: undefined,
      ...profile,
    };
  } else {
    initialValues = profile;
    profileImageUrl = profile.profileImage;
  }

  yup.addMethod(yup.string, 'validateSlug', function() {
    return this.test({
      name: 'name',
      message: 'Slug is already taken. Try again.',
      test: slug => {
        return new Promise((res, reject) =>
          isSlugTaken(slug).then(r => {
            if (isNewProfile) res(!r);
            res(true);
          }),
        );
      },
    });
  });

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required('Please enter your first or given name.'),
    lastName: yup
      .string()
      .trim()
      .required('Please enter your last or family name.'),
    company: yup.string().trim(),
    jobTitle: yup.string().trim(),
    email: yup
      .string()
      .email()
      .trim()
      .required('Please enter your email address.'),
    bio: yup.string().required('We need to know a bit about yourself.'),
    profileSlug: yup
      .string()
      .lowercase()
      .required('You must enter a value to represnet your member page.')
      .validateSlug(),
    acceptedCodeOfConduct: yup
      .boolean()
      .oneOf([true], 'Please accept our Code of Conduct policy.'),
    acceptedCommitmentToDiversity: yup
      .boolean()
      .oneOf([true], 'Please accept our Commitment to Diversity policy.'),
    acceptedAntiHarassmentPolicy: yup
      .boolean()
      .oneOf([true], 'Please accept Anti-Harrasment policy.'),
    acceptedTermsOfService: yup
      .boolean()
      .oneOf([true], 'Please accept our Terms of Services.'),
    isOver13: yup.boolean().oneOf([true], 'You Must be 13 years or older.'),
    canFeature: yup.boolean(),
    isDeactivated: yup.boolean(),
    profileImage: yup.string().url(),
  });

  const handleReset = () => {
    profile = {};
  };

  const postProfilePicture = async profilePhoto => {
    profileImageUploading = true;
    const formData = new FormData();
    formData.append('file', profilePhoto.currentTarget.files[0]);

    const res = await fetch(config.profileImageApi, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${$token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      // TODO drop an error modal saying there was a problem uploading
      return null;
    }

    const json = await res.json();

    profileImageUploading = false;
    profileImageUrl = json.data.url;

    return json.data.url;
  };
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
  let:errors
  let:touched
>
  <div>
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          This information is what we feature about you if you choose to make
          your profile public.
        </p>
        <p class="mt-2 text-sm leading-5 text-gray-500">
          To submit any type session your profile will have to be public.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">

        <div class="sm:col-span-3">
          <label
            for="first_name"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            First or Given Name
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              type="text"
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
            Last or Family Name
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
            <div
              class="flex-1 form-input block w-full min-w-0 rounded-none
              rounded-r-md transition duration-150 ease-in-out sm:text-sm
              sm:leading-5"
              class:bg-gray-50="{!isNewProfile}"
              class:text-gray-500="{!isNewProfile}"
            >
              <Input
                type="text"
                disabled="{!isNewProfile}"
                name="profileSlug"
              />
            </div>
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
        <div class="sm:col-span-3">
          <label
            for="company"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Company
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              type="text"
              name="company"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="jobTitle"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Job Tile
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              name="jobTitle"
              class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5"
            />
          </div>
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

              {#if profileImageUploading}
                <div class="h-full w-full flex flex-grow justify-center">
                  <ScaleOut />
                </div>
              {:else if profileImageUrl}
                <img class="h-full w-full" src="{profileImageUrl}" alt="" />
              {:else}
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904
                    0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0
                    018 0z"
                  ></path>
                </svg>
              {/if}
            </span>
            <span class="ml-5 rounded-md shadow-sm">
              <input
                name="profileImage"
                type="file"
                on:change="{e => postProfilePicture(e).then(r =>
                    setValue('profileImage', r),
                  )}"
                accept="image/x-png,image/png,.png,image/jpeg,.jpg,.jpeg,image/gif,.gif"
                class="py-2 px-3 border border-gray-300 rounded-md text-sm
                leading-4 font-medium text-gray-700 hover:text-gray-500
                focus:outline-none focus:border-blue-300
                focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800
                transition duration-150 ease-in-out"
              />
            </span>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label
            for="photo"
            class="block text-sm leading-5 font-medium text-gray-700"
          >
            Feature Me
          </label>

          <div class=" mt-2 flex items-center items-start">

            <Checkbox
              name="canFeature"
              checked="{profile.canFeature}"
              on:change="{({ detail }) => setValue('canFeature', detail)}"
              size="2.5rem"
            />

            <div class="ml-3 text-sm leading-5">
              <label for="comments" class="font-medium text-gray-700">
                Make your profile public.
              </label>
              <p class="text-gray-500">
                By selecting this, you're able to submit a session and THAT can
                feature your profile on that.us or thatconference.com. We do not
                sell any data.
              </p>
            </div>

            {#if touched['canFeature'] && errors['canFeature']}
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
          This information is private to THAT and allows us to better connect
          with you.
        </p>
      </div>
      <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Email address
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <Input
              type="email"
              name="email"
              placeholder="e.g. user@example.com"
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
          Everyone is awesome, and we want your help in keeping it that way.
          Also lawyers.
        </p>
      </div>

      <div class="mt-6">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">
            Do you agree to our:
          </legend>

          <div class="mt-4">
            <div class="relative flex items-center items-start">

              <Checkbox
                name="acceptedCodeOfConduct"
                checked="{profile.acceptedCodeOfConduct}"
                on:change="{({ detail }) => setValue('acceptedCodeOfConduct', detail)}"
                size="2.5rem"
                class="flex-none"
              />

              <div class="ml-3 text-sm leading-5">
                <label for="comments" class="font-medium text-gray-700">
                  <Link
                    open
                    href="https://www.thatconference.com/code-of-conduct"
                    class="font-medium text-indigo-600 hover:text-indigo-500
                    transition duration-150 ease-in-out"
                  >
                    Code of Conduct
                  </Link>
                </label>
                <p class="text-gray-500">
                  Be epic. Together we're a family of geeks and geeklings!
                </p>

                {#if touched['acceptedCodeOfConduct'] && errors['acceptedCodeOfConduct']}
                  <p class="text-red-600 italic">
                    {errors['acceptedCodeOfConduct']}
                  </p>
                {/if}
              </div>

            </div>
            <div class="mt-4">
              <div class="relative flex items-center items-start">

                <Checkbox
                  name="acceptedAntiHarassmentPolicy"
                  checked="{profile.acceptedAntiHarassmentPolicy}"
                  on:change="{({ detail }) => setValue('acceptedAntiHarassmentPolicy', detail)}"
                  size="2.5rem"
                  class="flex-none"
                />

                <div class="ml-3 text-sm leading-5">
                  <label for="comments" class="font-medium text-gray-700">
                    <Link
                      open
                      href="https://www.thatconference.com/anti-harassment-policy"
                      class="font-medium text-indigo-600 hover:text-indigo-500
                      transition duration-150 ease-in-out"
                    >
                      Commitment Anti-Harassment
                    </Link>
                  </label>
                  <p class="text-gray-500">
                    We do not accept any sort of harassment.
                  </p>
                  {#if touched['acceptedAntiHarassmentPolicy'] && errors['acceptedAntiHarassmentPolicy']}
                    <p class="text-red-600 italic">
                      {errors['acceptedAntiHarassmentPolicy']}
                    </p>
                  {/if}
                </div>

              </div>

              <div class="mt-4">
                <div class="relative flex items-center items-start">

                  <Checkbox
                    name="acceptedCommitmentToDiversity"
                    checked="{profile.acceptedCommitmentToDiversity}"
                    on:change="{({ detail }) => setValue('acceptedCommitmentToDiversity', detail)}"
                    size="2.5rem"
                    class="flex-none"
                  />

                  <div class="ml-3 text-sm leading-5">
                    <label for="comments" class="font-medium text-gray-700">
                      <Link
                        open
                        href="https://www.thatconference.com/commitment-to-diversity"
                        class="font-medium text-indigo-600 hover:text-indigo-500
                        transition duration-150 ease-in-out"
                      >
                        Commitment to Diversity
                      </Link>
                    </label>
                    <p class="text-gray-500">
                      Everyone is welcome at THAT! It's our daily responsibility
                      to make our industry the best place it can be, regardless
                      of color, gender, location, or even tech stack.
                    </p>
                    {#if touched['acceptedCommitmentToDiversity'] && errors['acceptedCommitmentToDiversity']}
                      <p class="text-red-600 italic">
                        {errors['acceptedCommitmentToDiversity']}
                      </p>
                    {/if}
                  </div>

                </div>

                <div class="mt-4">
                  <div class="relative flex items-center items-start">

                    <Checkbox
                      name="acceptedTermsOfService"
                      checked="{profile.acceptedTermsOfService}"
                      on:change="{({ detail }) => setValue('acceptedTermsOfService', detail)}"
                      size="2.5rem"
                      class="flex-none"
                    />

                    <div class="ml-3 text-sm leading-5">
                      <label for="candidates" class="font-medium text-gray-700">
                        <Link
                          open
                          href="https://www.thatconference.com/terms-of-use"
                          class="font-medium text-indigo-600
                          hover:text-indigo-500 transition duration-150
                          ease-in-out"
                        >
                          Terms of Use
                        </Link>
                      </label>
                      <p class="text-gray-500">Lawyer speak.</p>
                      {#if touched['acceptedTermsOfService'] && errors['acceptedTermsOfService']}
                        <p class="text-red-600 italic">
                          {errors['acceptedTermsOfService']}
                        </p>
                      {/if}
                    </div>
                  </div>

                </div>

                <div class="mt-4">
                  <div class="relative flex items-center items-start">

                    <Checkbox
                      name="isOver13"
                      checked="{profile.isOver13}"
                      on:change="{({ detail }) => setValue('isOver13', detail)}"
                      size="2.5rem"
                      class="flex-none"
                    />

                    <div class="ml-3 text-sm leading-5">
                      <label for="offers" class="font-medium text-gray-700">
                        Are you >= to the age of 13?
                      </label>
                      <p class="text-gray-500">
                        I'm sorry, but to have an account on THAT.us or
                        THATConference.com you have to at least 13 years old.
                      </p>
                      {#if touched['isOver13'] && errors['isOver13']}
                        <p class="text-red-600 italic">{errors['isOver13']}</p>
                      {/if}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-8">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          User Account Maintenance
        </h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">more to come...</p>
      </div>

      <div class="mt-6">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">
            User Account
          </legend>

          <div class="mt-4">
            <div class="relative flex items-center items-start">

              <Checkbox
                name="isDeactivated"
                checked="{profile.isDeactivated}"
                on:change="{({ detail }) => setValue('isDeactivated', detail)}"
                size="2.5rem"
                class="flex-none"
              />

              <div class="ml-3 text-sm leading-5">
                <label for="comments" class="font-medium text-gray-700">
                  <Link
                    open
                    href="https://www.thatconference.com/code-of-conduct"
                    class="font-medium text-indigo-600 hover:text-indigo-500
                    transition duration-150 ease-in-out"
                  >
                    Deactivate my account.
                  </Link>
                </label>
                <p class="text-gray-500">...</p>

                {#if touched['isDeactivated'] && errors['isDeactivated']}
                  <p class="text-red-600 italic">{errors['isDeactivated']}</p>
                {/if}
              </div>
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
          Reset
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

<style global>
  .sveltejs-forms .field.error input,
  .sveltejs-forms .field.error textarea {
    --text-opacity: 1;
    border: 1px solid rgba(224, 36, 36, var(--text-opacity));
  }
  .sveltejs-forms .field.error .message {
    margin-top: 0.2rem;
    font-style: italic;
    --text-opacity: 1;
    color: rgba(224, 36, 36, var(--text-opacity));
  }
</style>
