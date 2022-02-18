<script context="module">
	import mtz from 'moment-timezone';
	const timeZoneOptions = mtz.tz.names().map((t) => ({ value: t, label: t }));

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
				label: onThreeQuarter
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
			label: onHour.format('h:mm A')
		});

		timeSlotOptions.push({
			value: onFifteen.format('HH:mm'),
			label: onFifteen.format('h:mm A')
		});

		timeSlotOptions.push({
			value: onHalf.format('HH:mm'),
			label: onHalf.format('h:mm A')
		});

		timeSlotOptions.push({
			value: onThreeQuarter.format('HH:mm'),
			label: onThreeQuarter.format('h:mm A')
		});
	}
</script>

<script>
	export let touched, errors, values;
	export let setField; // parent form values
	export let event;

	import { tick } from 'svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import duration from 'dayjs/plugin/duration.js';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
	import isToday from 'dayjs/plugin/isToday.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	import { Input } from 'sveltejs-forms';
	import Datepicker from 'svelte-calendar';
	import Select from 'svelte-select';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import config from '$utils/config';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(duration);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(isToday);
	dayjs.extend(isBetween);
	dayjs.extend(advancedFormat);

	// control bindings
	let estimatedDurationSelect;
	let timezoneSelect;

	let currentEventId = values?.event?.id;
	let selectedTimeValue = values.selectedTime;
	let selectedDateValue = values.selectedDay
		? dayjs(values.selectedDay).toDate()
		: dayjs().toDate();

	$: startDate = event.id === config.eventId ? dayjs().toDate() : dayjs(event.startDate).toDate();
	$: endDate = dayjs(event.endDate).toDate();

	async function handleReset() {
		await tick();

		setField('selectedTime', undefined); // reset the starting time as the event range has changed.
		selectedTimeValue = undefined;
	}

	// reset the start date based on the event
	$: {
		if (currentEventId && !event.id) {
			startDate = dayjs(values.event.startDate).toDate();
			endDate = dayjs(values.event.endDate).toDate();
		} else if (currentEventId !== event.id) {
			startDate =
				event.id === config.eventId // if this is the default daily event. then it's just today's date.
					? dayjs().toDate()
					: dayjs(event.startDate).toDate();

			currentEventId = event.id;

			setField('selectedDay', dayjs(startDate).format('YYYY-MM-DD'));
			selectedDateValue = startDate;

			handleReset();
		}
	}

	$: timeSlotOptionsFiltered = dayjs(selectedDateValue).isToday()
		? timeSlotOptions.filter((t) => dayjs(t.value, 'HH:mm').isSameOrAfter(dayjs()))
		: timeSlotOptions.filter((t) => {
				const [HH, mm] = t.value.split(':');
				const d = dayjs(selectedDateValue).hour(HH).minute(mm);

				return d.isBetween(dayjs(event.startDate), dayjs(event.endDate));
		  });

	function findSelectedDuration(values) {
		return estimatedDurationOptions.find((item) => item.value === values['selectedDuration']);
	}

	function findSelectedTimezone(values) {
		return timeZoneOptions.find((item) => item.value === values['selectedTimezone']);
	}
</script>

<div class="px-4 py-5 sm:px-6 ">
	<div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
		<div>
			<label
				for="selectedDay"
				class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
			>
				Select a Day:
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
				/>
			</div>
		</div>

		<div class="mt-1 sm:col-span-2 sm:mt-0">
			<div class="max-w-lg sm:text-sm sm:leading-5">
				<Input hidden name="selectedDay" bind:value={selectedDateValue} />
				<Datepicker
					start={startDate}
					end={endDate}
					bind:selected={selectedDateValue}
					format={dayjs(selectedDateValue).format('dddd, MMM D, YYYY z')}
					style="form-select sm:text-sm sm:leading-5 shadow-sm hover:border-gray-700"
					on:dateSelected={({ detail: { date } }) =>
						setField('selectedDay', dayjs(date).format('YYYY-MM-DD'))}
				/>
			</div>
		</div>
	</div>

	<div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
		<div>
			<label
				for="activity_startTime"
				class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
			>
				Select a Time:
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
				/>
			</div>
		</div>

		<div class="mt-1 sm:col-span-2 sm:mt-0">
			<div class="flex max-w-lg space-x-8">
				<div>
					<legend class="block text-sm font-medium leading-5 text-gray-400"> Starting Time </legend>
					<div class="mt-1 w-32">
						<Select
							inputAttributes={{ name: 'selectedTime' }}
							items={timeSlotOptionsFiltered}
							bind:value={selectedTimeValue}
							on:select={({ detail }) => setField('selectedTime', detail.value)}
							on:clear={() => setField('selectedTime', undefined)}
							hasError={touched['selectedTime'] && errors['selectedTime']}
							inputStyles="form-select relative block w-full bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 rounded-md shadow-sm hover:border-gray-700"
						/>
					</div>
				</div>

				<div>
					<legend class="block text-sm font-medium leading-5 text-gray-400"> Time Zone </legend>
					<div class="mt-1 w-64 rounded-md shadow-sm">
						<Select
							bind:this={timezoneSelect}
							inputAttributes={{ name: 'selectedTimezone' }}
							on:select={({ detail }) => setField('selectedTimezone', detail.value)}
							hasError={touched['selectedTimezone'] && errors['selectedTimezone']}
							items={timeZoneOptions}
							on:clear={() => setField('selectedTimezone', undefined)}
							value={findSelectedTimezone(values)}
							inputStyles="form-select relative block w-full rounded-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:border-gray-700"
						/>
					</div>
				</div>
			</div>
			<div class="mt-6">
				{#if touched['selectedTime'] && errors['selectedTime']}
					<p class="italic text-red-600">{errors['selectedTime']}</p>
				{/if}
				{#if touched['selectedTimezone'] && errors['selectedTimezone']}
					<p class="italic text-red-600">{errors['selectedTimezone']}</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
		<div>
			<label
				for="activity_duration"
				class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
			>
				Estimated Duration (hours):
			</label>
			<div class="relative">
				<span
					class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400"
				/>
			</div>
		</div>

		<div class="mt-1 sm:col-span-2 sm:mt-0">
			<div class="w-32">
				<Select
					bind:this={estimatedDurationSelect}
					inputAttributes={{ name: 'selectedDuration' }}
					on:select={({ detail }) => setField('selectedDuration', detail.value)}
					hasError={touched['selectedDuration'] && errors['selectedDuration']}
					items={estimatedDurationOptions}
					on:clear={() => setField('selectedDuration', undefined)}
					value={findSelectedDuration(values)}
					inputStyles="form-select relative block w-full rounded-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:border-gray-700"
				/>
			</div>
			<div class="mt-6">
				{#if touched['selectedDuration'] && errors['selectedDuration']}
					<p class="italic text-red-600">
						{errors['selectedDuration']}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
