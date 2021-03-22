<script context="module">
  import mtz from 'moment-timezone';
  const timeZoneOptions = mtz.tz.names().map(t => ({ value: t, label: t }));

  const estimatedDurationOptions = [];

  estimatedDurationOptions.push({ value: '0:30', label: '0:30' });
  estimatedDurationOptions.push({ value: '0:45', label: '0:45' });

  for (let hour = 1; hour < 9; hour++) {
    const onHour = `${hour}:00`;
    estimatedDurationOptions.push({ value: onHour, label: onHour });

    if (hour !== 8) {
      const onFifteen = `${hour}:15`;
      estimatedDurationOptions.push({ value: onFifteen, label: onFifteen });

      const onHourHalf = `${hour}:30`;
      estimatedDurationOptions.push({ value: onHourHalf, label: onHourHalf });

      const onThreeQuarter = `${hour}:45`;
      estimatedDurationOptions.push({
        value: onThreeQuarter,
        label: onThreeQuarter,
      });
    }
  }

  const timeSlotOptions = [];

  for (let hour = 0; hour < 24; hour++) {
    const onHour = dayjs().hour(hour).minute(0);

    const onFifteen = dayjs().hour(hour).minute(15);
    const onHalf = dayjs().hour(hour).minute(30);
    const onThreeQuarter = dayjs().hour(hour).minute(45);

    timeSlotOptions.push({
      value: onHour.format('HH:mm'),
      label: onHour.format('h:mm A'),
    });

    timeSlotOptions.push({
      value: onFifteen.format('HH:mm'),
      label: onFifteen.format('h:mm A'),
    });

    timeSlotOptions.push({
      value: onHalf.format('HH:mm'),
      label: onHalf.format('h:mm A'),
    });

    timeSlotOptions.push({
      value: onThreeQuarter.format('HH:mm'),
      label: onThreeQuarter.format('h:mm A'),
    });
  }
</script>

<script>
  export let touched, errors, values, setField; // parent form values
  export let event;

  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import duration from 'dayjs/plugin/duration';
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
  import isToday from 'dayjs/plugin/isToday';
  import isBetween from 'dayjs/plugin/isBetween';
  import { Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Datepicker from 'svelte-calendar'; //https://github.com/6eDesign/svelte-calendar
  import Select from 'svelte-select'; //https://github.com/rob-balfre/svelte-select

  import config from '../../../../config';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(duration);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isToday);
  dayjs.extend(isBetween);

  let initDurationInMinutes;
  let originalStartTime;

  // control bindings
  let estimatedDurationSelect;
  let timeSlotSelect;
  let timezoneSelect;

  let currentEventId;

  $: selectedDateValue = dayjs().toDate();
  $: startDate = dayjs().toDate();
  $: endDate = dayjs(event.endDate).toDate();

  // reset the start date based on the event
  $: {
    if (currentEventId !== event.id) {
      startDate =
        event.id === config.eventId
          ? dayjs().toDate()
          : dayjs(event.startDate).toDate();
      currentEventId = event.id;

      selectedDateValue = startDate;
      setField('selectedDay', dayjs(selectedDateValue).format('YYYY-MM-DD'));
    }
  }

  $: timeSlotOptionsFiltered = dayjs(selectedDateValue).isToday()
    ? timeSlotOptions.filter(t =>
        dayjs(t.value, 'HH:mm').isSameOrAfter(dayjs()),
      )
    : timeSlotOptions.filter(t => {
        const [HH, mm] = t.value.split(':');
        const d = dayjs(selectedDateValue).hour(HH).minute(mm);

        return d.isBetween(dayjs(event.startDate), dayjs(event.endDate));
      });

  function findSelectedTimeSlot(values) {
    return timeSlotOptions.find(item => item.value === values['selectedTime']);
  }

  function findSelectedDuration(values) {
    return estimatedDurationOptions.find(
      item => item.value === values['selectedDuration'],
    );
  }

  function findSelectedTimezone(values) {
    return timeZoneOptions.find(
      item => item.value === values['selectedTimezone'],
    );
  }
</script>

<div class="px-4 sm:px-6 py-5 ">
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label
      for="selectedDay"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      Select a Day:
    </label>

    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg sm:text-sm sm:leading-5">
        <Input hidden name="selectedDay" bind:value="{selectedDateValue}" />
        <Datepicker
          start="{startDate}"
          end="{endDate}"
          bind:selected="{selectedDateValue}"
          format="{dayjs(selectedDateValue).format('dddd, MMM D, YYYY')}"
          style="rounded-md shadow-sm"
          on:dateSelected="{({ detail: { date } }) =>
            setField('selectedDay', dayjs(date).format('YYYY-MM-DD'))}" />
      </div>
    </div>
  </div>

  <div
    class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
    <label
      for="activity_startTime"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      Select a Time:
    </label>

    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="flex space-x-8 max-w-lg">
        <div>
          <legend class="block text-sm font-medium leading-5 text-gray-400">
            Starting Time
          </legend>
          <div class="mt-1 w-32">
            <Select
              bind:this="{timeSlotSelect}"
              inputAttributes="{{ name: 'selectedTime' }}"
              on:select="{({ detail }) =>
                setField('selectedTime', detail.value)}"
              hasError="{touched['selectedTime'] && errors['selectedTime']}"
              items="{timeSlotOptionsFiltered}"
              on:clear="{() => setField('selectedTime', undefined)}"
              selectedValue="{findSelectedTimeSlot(values)}"
              inputStyles="form-select relative block w-full
              bg-transparent focus:z-10 transition ease-in-out duration-150
              sm:text-sm sm:leading-5 rounded-md shadow-sm" />
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
              on:select="{({ detail }) =>
                setField('selectedTimezone', detail.value)}"
              hasError="{touched['selectedTimezone'] &&
                errors['selectedTimezone']}"
              items="{timeZoneOptions}"
              on:clear="{() => setField('selectedTimezone', undefined)}"
              selectedValue="{findSelectedTimezone(values)}"
              inputStyles="form-select relative block w-full rounded-md
                bg-transparent focus:z-10 transition ease-in-out duration-150
                sm:text-sm sm:leading-5" />
          </div>
        </div>
      </div>
      <div class="mt-6">
        {#if touched['selectedTime'] && errors['selectedTime']}
          <p class="text-red-600 italic">{errors['selectedTime']}</p>
        {/if}
        {#if touched['selectedTimezone'] && errors['selectedTimezone']}
          <p class="text-red-600 italic">{errors['selectedTimezone']}</p>
        {/if}
      </div>
    </div>
  </div>

  <div
    class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
    <label
      for="activity_duration"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      Estimated Duration (hours):
    </label>

    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="w-32">
        <Select
          bind:this="{estimatedDurationSelect}"
          inputAttributes="{{ name: 'selectedDuration' }}"
          on:select="{({ detail }) =>
            setField('selectedDuration', detail.value)}"
          hasError="{touched['selectedDuration'] && errors['selectedDuration']}"
          items="{estimatedDurationOptions}"
          on:clear="{() => setField('selectedDuration', undefined)}"
          selectedValue="{findSelectedDuration(values)}"
          inputStyles="form-select relative block w-full rounded-md
          bg-transparent focus:z-10 transition ease-in-out duration-150
          sm:text-sm sm:leading-5" />
      </div>
      <div class="mt-6">
        {#if touched['selectedDuration'] && errors['selectedDuration']}
          <p class="text-red-600 italic">
            {errors['selectedDuration']}
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>
