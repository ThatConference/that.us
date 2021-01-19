<script context="module">
  import mtz from 'moment-timezone';
  const timeZoneOptions = mtz.tz.names().map(t => ({ value: t, label: t }));

  const timeSlotOptions = [];

  for (let hour = 0; hour < 24; hour++) {
    const onHour = dayjs().hour(hour).minute(0);

    const onHalf = dayjs().hour(hour).minute(30);

    timeSlotOptions.push({
      value: onHour.format('HH:mm'),
      label: onHour.format('h:mm A'),
    });

    timeSlotOptions.push({
      value: onHalf.format('HH:mm'),
      label: onHalf.format('h:mm A'),
    });
  }

  const estimatedDurationOptions = [];

  const counter = `0:30`;
  estimatedDurationOptions.push({ value: counter, label: counter });

  for (let hour = 1; hour < 9; hour++) {
    const onHour = `${hour}:00`;
    estimatedDurationOptions.push({ value: onHour, label: onHour });

    if (hour !== 8) {
      const onHourHalf = `${hour}:30`;
      estimatedDurationOptions.push({ value: onHourHalf, label: onHourHalf });
    }
  }
</script>

<script>
  export let handleSubmit;
  export let handleWithdraw;
  export let initialValues;

  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import duration from 'dayjs/plugin/duration';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import isToday from 'dayjs/plugin/isToday';

  import Datepicker from 'svelte-calendar'; //https://github.com/6eDesign/svelte-calendar

  import { Form, Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Select from 'svelte-select'; //https://github.com/rob-balfre/svelte-select
  import Tags from 'svelte-tags-input';
  import * as yup from 'yup';
  import { isEmpty } from 'lodash';

  import { Waiting, ModalError } from '../../elements';
  import { thatProfile } from '../../utilities/security.js';
  import ErrorNotificaiton from '../notifications/Error.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(duration);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isToday);

  const selectedTimezoneDefault = dayjs.tz.guess();
  let createDisabled = true;
  let selectedDayDefault = new Date();
  let selectedDateValue = selectedDayDefault;

  let initDurationInMinutes;
  let originalStartTime;

  if (initialValues) {
    const { durationInMinutes, startTime } = initialValues;

    originalStartTime = dayjs(startTime);
    initDurationInMinutes = durationInMinutes
      ? dayjs
          .utc(dayjs.duration(durationInMinutes, 'minutes').asMilliseconds())
          .format('H:mm')
      : undefined;

    selectedDateValue = originalStartTime.toDate();
  }

  $: if (!isEmpty($thatProfile)) {
    createDisabled = false;
  }

  const schema = yup.object().shape({
    title: yup.string().trim().required('Please add a title.'),
    shortDescription: yup
      .string()
      .trim()
      .required('Please add a short description.'),
    tags: yup.array().of(yup.string()),
    selectedDay: yup.string().required('Please select a day.'),
    selectedTime: yup.string().required('Please select a starting time.'),
    selectedTimezone: yup
      .string()
      .required('Please select the appropiate timezone.'),
    selectedDuration: yup
      .string()
      .required('Please select an estimated duration.'),
  });

  let tagsInput;
  let tagInputValues = initialValues ? initialValues.tags : [];

  let estimatedDurationSelect;
  let timeSlotSelect;
  let timezoneSelect;

  let formInitValues;

  if (initialValues) {
    const { title, shortDescription, tags } = initialValues;

    formInitValues = {
      title,
      shortDescription,
      tags,
      selectedDay: originalStartTime.format('YYYY-MM-DD'),
      selectedTime: originalStartTime.format('HH:mm'),
      selectedTimezone: selectedTimezoneDefault,
      selectedDuration: initDurationInMinutes,
    };
  } else {
    formInitValues = {
      title: undefined,
      shortDescription: undefined,
      tags: tagInputValues,
      selectedDay: dayjs(selectedDayDefault).format('YYYY-MM-DD'),
      selectedTime: undefined,
      selectedTimezone: selectedTimezoneDefault,
      selectedDuration: undefined,
    };
  }

  const canCancelActivityAction = () => {
    let results = false;

    if (handleWithdraw) {
      if (dayjs(initialValues.startTime).isSameOrAfter(dayjs(), 'day'))
        results = true;
    }
    return results;
  };

  function handleReset() {
    tagInputValues = [];
    selectedDateValue = selectedDayDefault;
  }

  const findSelectedTimeSlot = values =>
    timeSlotOptions.find(item => item.value === values['selectedTime']);

  const findSelectedDuration = values =>
    estimatedDurationOptions.find(
      item => item.value === values['selectedDuration'],
    );

  const findSelectedTimezone = values =>
    timeZoneOptions.find(item => item.value === values['selectedTimezone']);

  let timeSlotOptionsFiltered = timeSlotOptions;
  $: timeSlotOptionsFiltered = dayjs(selectedDateValue).isToday()
    ? timeSlotOptions.filter(t =>
        dayjs(dayjs(t.value, 'HH:mm')).isSameOrAfter(dayjs()),
      )
    : timeSlotOptions;
</script>

{#if createDisabled}
  <ModalError
    title="Oh NO! You have an incomplete profile!"
    text="It appears you haven't created your profile yet. You can't create a
    activity until that's complete."
    action="{{ title: 'Create Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Activities', href: '/activities' }}"
  />
{:else if !$thatProfile.canFeature}
  <ModalError
    title="Your Profile Isn't Public."
    text="It appears we cannot feature your profile. You need to have a public
    profile to create a activity."
    action="{{ title: 'Update Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Activities', href: '/activities' }}"
  />
{/if}

<Form
  schema="{schema}"
  initialValues="{formInitValues}"
  validateOnBlur="{false}"
  validateOnChange="{false}"
  on:submit="{handleSubmit}"
  on:reset="{handleReset}"
  let:isSubmitting
  let:isValid
  let:setValue
  let:values
  let:errors
  let:touched
>
  <div>
    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
      Below is a quick form to help others identify if they have interest in
      this topic or can be of some help to others.
    </p>
  </div>

  <div class="mt-6 sm:mt-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
        sm:border-gray-200 sm:pt-5"
    >
      <label
        for="activity_title"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2 col-span-1"
      >
        What would you like to chat about?
      </label>

      <div class="mt-1 sm:mt-0 col-span-2">
        <div class="max-w-lg border rounded-md shadow-sm">
          <Input
            name="title"
            autofocus
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
        for="activity_shortDescription"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
      >
        Explain a bit more about what you'd like to chat about.
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg border rounded-md shadow-sm">
          <Input
            name="shortDescription"
            multiline
            spellcheck="true"
            rows="5"
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
        for="activity_tags"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
      >
        Set 5 or less 'tags' to help categorize this chat. (return/enter is the
        delimiter)
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg rounded-md shadow-sm tag-form-input">
          <Tags
            name="tags"
            bind:this="{tagsInput}"
            tags="{tagInputValues}"
            allowBlur="{true}"
            maxTags="{5}"
            onlyUnique="{true}"
            on:tags="{({ detail }) => setValue('tags', detail.tags)}"
            class="form-input block w-full transition duration-150 ease-in-out
              sm:text-sm sm:leading-5 rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>

    <div
      class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
        sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="activity_selectedDay"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
      >
        Select a Day:
      </label>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="max-w-lg sm:text-sm sm:leading-5">
          <Input name="selectedDay" hidden />
          <Datepicker
            name="selectedDay"
            start="{new Date()}"
            end="{dayjs().add(6, 'month').toDate()}"
            bind:selected="{selectedDateValue}"
            style="rounded-md shadow-sm"
            format="{dayjs(selectedDateValue).format('dddd, MMM D, YYYY')}"
            on:dateSelected="{({ detail: { date } }) => setValue('selectedDay', dayjs(date).format('YYYY-MM-DD'))}"
          />
        </div>
      </div>
    </div>

    <div
      class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
        sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="activity_startTime"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
      >
        Select a Time:
      </label>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="flex space-x-8 max-w-lg">
          <div>
            <legend class="block text-sm font-medium leading-5 text-gray-400">
              Starting Time
            </legend>
            <div class="mt-1 rounded-md shadow-sm w-32">
              <Select
                bind:this="{timeSlotSelect}"
                inputAttributes="{{ name: 'selectedTime' }}"
                on:select="{({ detail }) => setValue('selectedTime', detail.value)}"
                hasError="{touched['selectedTime'] && errors['selectedTime']}"
                items="{timeSlotOptionsFiltered}"
                on:clear="{() => setValue('selectedTime', undefined)}"
                selectedValue="{findSelectedTimeSlot(values)}"
                inputStyles="form-select relative block w-full rounded-md
                bg-transparent focus:z-10 transition ease-in-out duration-150
                sm:text-sm sm:leading-5"
              />

              {#if touched['selectedTime'] && errors['selectedTime']}
                <p class="text-red-600 italic">{errors['selectedTime']}</p>
              {/if}
            </div>
          </div>

          <div>
            <legend class="block text-sm font-medium leading-5 text-gray-400">
              Time Zone
            </legend>
            <div class="mt-1 rounded-md shadow-sm w-64">
              <Select
                bind:this="{timezoneSelect}"
                inputAttributes="{{ name: 'selectedTimezone' }}"
                on:select="{({ detail }) => setValue('selectedTimezone', detail.value)}"
                hasError="{touched['selectedTimezone'] && errors['selectedTimezone']}"
                items="{timeZoneOptions}"
                on:clear="{() => setValue('selectedTimezone', undefined)}"
                selectedValue="{findSelectedTimezone(values)}"
                inputStyles="form-select relative block w-full rounded-md
                bg-transparent focus:z-10 transition ease-in-out duration-150
                sm:text-sm sm:leading-5"
              />

              {#if touched['selectedTimezone'] && errors['selectedTimezone']}
                <p class="text-red-600 italic">{errors['selectedTimezone']}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
        sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="activity_duration"
        class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
          sm:pt-2"
      >
        Estimated Duration (hours):
      </label>

      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="w-32">
          <Select
            bind:this="{estimatedDurationSelect}"
            inputAttributes="{{ name: 'selectedDuration' }}"
            on:select="{({ detail }) => setValue('selectedDuration', detail.value)}"
            hasError="{touched['selectedDuration'] && errors['selectedDuration']}"
            items="{estimatedDurationOptions}"
            on:clear="{() => setValue('selectedDuration', undefined)}"
            selectedValue="{findSelectedDuration(values)}"
            inputStyles="form-select relative block w-full rounded-md
            bg-transparent focus:z-10 transition ease-in-out duration-150
            sm:text-sm sm:leading-5"
          />

          {#if touched['selectedDuration'] && errors['selectedDuration']}
            <p class="text-red-600 italic">{errors['selectedDuration']}</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-200 pt-5">
      <div class="flex justify-end space-x-4">
        <span class="inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            disabled="{isSubmitting}"
            class="inline-flex justify-center py-2 px-4 border-2
              border-thatBlue-500 text-sm leading-5 font-medium rounded-md
              text-thatBlue-500 bg-white hover:bg-thatBlue-500 hover:text-white
              focus:outline-none focus:ring-thatBlue-500
              focus:bg-thatBlue-500 focus:text-white focus:border-thatBlue-800
              active:bg-thatBlue-800 transition duration-150 ease-in-out"
          >
            {initialValues ? 'Update' : 'Create'}
          </button>
        </span>

        {#if canCancelActivityAction()}
          <span class="inline-flex rounded-md shadow-sm">
            <button
              disabled="{isSubmitting}"
              on:click|preventDefault="{handleWithdraw}"
              tabindex="-1"
              class="py-2 px-4 border-2 order border-transparent rounded-md
                text-sm leading-5 font-medium text-white bg-red-400
                hover:bg-red-600 focus:outline-none focus:border-red-700
                focus:ring-red active:bg-red-700 transition
                duration-150 ease-in-out"
            >
              Cancel / Withdraw
            </button>
          </span>
        {/if}
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
