<script>
  export let handleSubmit;
  export let initialValues;

  import dayjs from 'dayjs';
  import { Circle2 } from 'svelte-loading-spinners';
  import { Form, Input, Select, Choice } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';
  import _ from 'lodash';

  import { sessionTimes } from './sessionTimes';
  import { Waiting, ModalError } from '../../elements';

  import { thatProfile } from '../../utilities/security.js';

  if (initialValues) {
    delete initialValues.id;
    delete initialValues.eventId;
  }

  let createDisabled = true;

  $: if (!_.isEmpty($thatProfile)) {
    createDisabled = false;
  }

  const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required(),
    shortDescription: yup
      .string()
      .trim()
      .required(),
    startTime: yup.string().required(),
    tags: yup.array().of(yup.string()),
  });

  let tagsInput;
  let tagsInputValues = initialValues ? initialValues.tags : [];

  const convertOptionsToTimeZone = sessionTimes => {
    const x = sessionTimes.map(t => ({
      id: t.id,
      title: `${t.title} ( ${dayjs(t.id).format('hh:mm a')} in your timezone )`,
    }));

    return x;
  };

  function handleReset() {
    tagsInputValues = [];
  }
</script>

{#if createDisabled}
  <ModalError
    title="Oh NO! You have an incomplete profile!"
    text="It appears you haven't created your profile yet. You can't create a
    session until that's complete."
    action="{{ title: 'Create Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Schedule', href: '/sessions' }}"
  />
{:else if !$thatProfile.canFeature}
  <ModalError
    title="Your Profile Isn't Public."
    text="It appears we cannot feature your profile. You need to have a public
    profile to create a session."
    action="{{ title: 'Update Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Schedule', href: '/sessions' }}"
  />
{/if}

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
    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
      Let's gather around a vitual circle and chat. Below is a quick form to
      help others identify if they have interest in the topic or can be of some
      help to the converation.
    </p>
  </div>

  <div class="mt-6 sm:mt-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
      sm:border-gray-200 sm:pt-5"
    >

      <label
        for="session_title"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
        sm:pt-2"
      >
        What would you like to chat about?
      </label>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
          <Input
            name="title"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
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
        Explain a bit more about what you'd like to chat about.
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
          <Input
            name="shortDescription"
            multiline="{true}"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
      </div>
    </div>

    <div
      class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
      sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="session_tags"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
        sm:pt-2"
      >
        Set 5 or less 'tags' to help categorize this chat. (return/enter is the
        delimiter)
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs tag-form-input">
          <Tags
            name="tags"
            tags="{tagsInputValues}"
            bind:this="{tagsInput}"
            maxTags="{5}"
            onlyUnique="{true}"
            on:tags="{({ detail }) => setValue('tags', detail.tags)}"
            class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5"
          />
        </div>
      </div>
    </div>

    <div
      class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
      sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="session_startTime"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
        sm:pt-2"
      >
        Select a time to chat. ( CST gmt-5 )
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
          <Select
            name="startTime"
            options="{convertOptionsToTimeZone(sessionTimes)}"
            class="form-input block w-full transition duration-150 ease-in-out
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
          class="inline-flex justify-center py-2 px-4 border border-transparent
          text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          duration-150 ease-in-out"
        >
          {initialValues ? 'Update Session' : 'Add Session'}
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
