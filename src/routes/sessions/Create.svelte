<script>
  import { getContext } from 'svelte';
  import dayjs from 'dayjs';
  import { Circle2 } from 'svelte-loading-spinners';
  import { Form, Input, Select, Choice } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import { navigateTo } from 'yrv';
  import { getClient } from '@urql/svelte';
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';

  import { ActionHeader, Waiting } from '../../elements';
  import Nav from '../../components/nav/Top.svelte';

  import { sessionTimes } from './sessionTimes';

  const CREATE_SESSION = `
    mutation createSession($eventId: ID!, $newSession: OpenSpaceCreateInput!) {
      sessions {
        create(eventId: $eventId) {
          openSpace(openspace: $newSession) {
            id
            eventId
            title
            shortDescription
            tags
            type
            status
          }
        }
      }
    }
  `;

  let tagsInput;
  let tagsInputValues = [];

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const { title, shortDescription, startTime, tags } = values;

    const mutationVariables = {
      eventId: 'ByE7Dc7eCGcRFzLhWhuI',
      newSession: {
        title,
        shortDescription,
        status: 'ACCEPTED',
        tags,
        startTime,
      },
    };

    const {
      data: { newSession },
      error,
    } = await getClient()
      .mutation(CREATE_SESSION, mutationVariables)
      .toPromise();

    setSubmitting(false);
    tagsInputValues = [];
    resetForm();
    navigateTo('/sessions', { replace: true });
  }

  const schema = yup.object().shape({
    title: yup.string().required(),
    shortDescription: yup.string().required(),
    startTime: yup.string().required(),
    tags: yup.array().of(yup.string()),
  });

  function handleReset() {
    tagsInputValues = [];
  }

  const initialValues = {
    tags: tagsInputValues,
  };

  const convertOptionsToTimeZone = sessionTimes => {
    const x = sessionTimes.map(t => ({
      id: t.id,
      title: `${t.title} ( ${dayjs(t.id).format('hh:mm a')} in your timezone )`,
    }));

    return x;
  };
</script>

<svelte:head>
  <title>Create a New Session * THAT.us</title>
</svelte:head>

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
    <ActionHeader title="Create A New Chat" />
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">

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
              Let's gather around a vitual circle and chat. Below is a quick
              form to help others identify if they have interest in the topic or
              can be of some help to the converation.
            </p>
          </div>

          <div class="mt-6 sm:mt-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
              sm:border-gray-200 sm:pt-5"
            >

              <label
                for="session_title"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                What would you like to chat about?
              </label>

              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <Input
                    name="title"
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
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Explain a bit more about what you'd like to chat about.
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <Input
                    name="shortDescription"
                    multiline="{true}"
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
                for="session_tags"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Set 5 or less 'tags' to help categorize this chat.
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div
                  class="max-w-lg rounded-md shadow-sm sm:max-w-xs
                  tag-form-input"
                >
                  <Tags
                    name="tags"
                    tags="{tagsInputValues}"
                    bind:this="{tagsInput}"
                    maxTags="{5}"
                    onlyUnique="{true}"
                    on:tags="{({ detail }) => setValue('tags', detail.tags)}"
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
                for="session_startTime"
                class="block text-sm font-medium leading-5 text-gray-700
                sm:mt-px sm:pt-2"
              >
                Select a time to chat. ( CST gmt-5 )
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <Select
                    name="startTime"
                    options="{convertOptionsToTimeZone(sessionTimes)}"
                    class="form-input block w-full transition duration-150
                    ease-in-out sm:text-sm sm:leading-5"
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
                  Reset
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
                  Submit
                </button>
              </span>
            </div>
          </div>

          {#if isSubmitting}
            <Waiting />
          {/if}

        </Form>
      </div>
    </div>
  </main>
</div>

<style>
  .tag-form-input :global(.svelte-tags-input-tag) {
    background: #252f3f;
  }
</style>
