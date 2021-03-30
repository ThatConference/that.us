<script context="module">
  const schema = yup.object().shape({
    eventId: yup.string().required('Please select an event.'),
    title: yup.string().ensure().trim().required('Please enter a title.'),
    shortDescription: yup
      .string()
      .ensure()
      .trim()
      .required('Please add a short description.'),
    tags: yup.array().ensure().of(yup.string()),
    selectedDay: yup.string().required('Please select a day.'),
    selectedTime: yup.string().required('Please select a starting time.'),
    selectedTimezone: yup
      .string()
      .required('Please select the appropiate timezone.'),
    selectedDuration: yup
      .string()
      .required('Please select an estimated duration.'),
  });
</script>

<script>
  export let initialData;
  export let handleWithdraw;
  export let handleSubmit;

  import { fade } from 'svelte/transition';
  import dayjs from 'dayjs';

  import { Form } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import { isEmpty } from 'lodash';
  import { router } from 'yrv';
  import * as yup from 'yup';

  import { formatActivityInitialInput } from './initialValues';
  import { Waiting, ModalError } from '../../../../elements';
  import { thatProfile } from '../../../../utilities/security.js';
  import ErrorNotificaiton from '../../../../components/notifications/Error.svelte';
  import { Standard as StandardLink } from '../../../../elements/links';

  import Steps from '../_Steps.svelte';
  import SectionTitle from './_SectionTitle.svelte';
  import EventSection from './_Event.svelte';
  import WhatSection from './_What.svelte';
  import WhenSection from './_When.svelte';

  const { eventId } = $router.params;
  const formattedInitial = formatActivityInitialInput({
    event: {
      id: eventId,
    }, // if there is an eventId it will get overwritten
    ...initialData,
  });

  let createDisabled = true;
  $: eventSelected = {};

  $: if (!isEmpty($thatProfile)) {
    createDisabled = false;
  }

  function handleEventSelected({ detail }) {
    eventSelected = { ...detail };
  }

  function canCancelActivityAction() {
    let results = false;

    if (handleWithdraw) {
      if (dayjs(formattedInitial.startTime).isSameOrAfter(dayjs(), 'day'))
        results = true;
    }
    return results;
  }

  function handleReset() {
    // tagInputValues = [];
    // selectedDateValue = selectedDayDefault;
  }
</script>

{#if createDisabled}
  <ModalError
    title="Oh NO! You have an incomplete profile!"
    text="It appears you haven't created your profile yet. You can't create an
    activity until that's complete."
    action="{{ title: 'Create Profile', href: '/my/settings/profile' }}"
    returnTo="{{ title: 'Return to Activities', href: '/activities' }}" />
{:else if !$thatProfile.canFeature}
  <ModalError
    title="Your Profile Isn't Public."
    text="It appears we cannot feature your profile. You need to have a public
    profile to create an activity."
    action="{{ title: 'Update Profile', href: '/my/settings/profile' }}"
    returnTo="{{ title: 'Return to Activities', href: '/activities' }}" />
{/if}

<Form
  schema="{schema}"
  initialValues="{formattedInitial}"
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  on:reset="{handleReset}"
  let:isSubmitting
  let:isValid
  let:setValue
  let:values
  let:errors
  let:touched>
  <div class="grid grid-cols-1 gap-12 lg:grid-flow-col-dense lg:grid-cols-3">
    <div class="space-y-6 lg:col-start-1 lg:col-span-2">
      <!-- event section -->
      <section in:fade>
        <SectionTitle title="Select a Location" stepNumber="1" />

        <EventSection
          setField="{setValue}"
          eventId="{formattedInitial.event.id}"
          on:event-selected="{handleEventSelected}" />
      </section>

      <!-- what section -->
      <section in:fade="{{ delay: 200 }}" class="mt-8">
        <SectionTitle title="Describe the Activity" stepNumber="2" />
        <WhatSection setField="{setValue}" initialData="{formattedInitial}" />
      </section>

      {#if eventSelected}
        <!-- when section -->
        <section in:fade class="mt-8">
          <SectionTitle title="Schedule a Time" stepNumber="3" />

          <WhenSection
            touched="{touched}"
            errors="{errors}"
            values="{formattedInitial}"
            setField="{setValue}"
            event="{eventSelected}" />
        </section>
      {/if}
    </div>

    <section class="lg:col-start-3 lg:col-span-1 relative">
      <div class="sticky top-8">
        <Steps>
          <div slot="actions">
            <div class="flex flex-col space-y-4">
              {#if canCancelActivityAction()}
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    disabled="{isValid}"
                    on:click|preventDefault="{handleWithdraw}"
                    tabindex="-1"
                    class="w-full py-2 px-4 order 
                      border-2 border-transparent rounded-md
                      text-sm leading-5 font-medium text-white 
                      bg-red-400
                      active:bg-red-700 
                      hover:bg-red-600 
                      focus:outline-none focus:border-red-700 focus:ring-red 
                      transition duration-150 ease-in-out">
                    Cancel / Withdraw
                  </button>
                </span>
              {/if}

              <span class="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full py-2 px-4
                    border-2 border-thatBlue-500 rounded-md
                    text-sm leading-5 font-medium 
                  text-thatBlue-500 bg-white 
                  hover:bg-thatBlue-500 hover:text-white
                    focus:outline-none focus:ring-thatBlue-500 focus:bg-thatBlue-500 focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 
                  transition duration-150 ease-in-out">
                  {initialData ? 'Update Activity' : 'Submit Activity'}
                </button>
              </span>
            </div>
          </div>
        </Steps>
      </div>
    </section>
  </div>

  {#if isValid === false}
    <ErrorNotificaiton message="Please correct the issues listed above." />
  {/if}

  {#if isSubmitting}
    <div class="py-24 flex flex-grow justify-center">
      <Waiting />
    </div>
  {/if}
</Form>
