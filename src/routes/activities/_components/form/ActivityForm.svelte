<script>
	export let events;
	export let activeEvents;
	export let isBackdoor = false;
	export let isEdit = false;

	export let eventId;
	export let initialData;
	export let handleWithdraw;
	export let handleSubmit;

	import { session } from '$app/stores';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import dayjs from 'dayjs';
	import { Form, Input } from 'sveltejs-forms';
	import lodash from 'lodash';

	import { Waiting, ModalError } from '$elements';
	import ErrorNotificaiton from '$components/notifications/Error.svelte';

	import { openSpaces, online, standard, workshop } from './schemas';
	import { formatActivityInitialInput } from './initialValues';

	import Steps from '../_Steps.svelte';
	import SectionTitle from './_SectionTitle.svelte';
	import EventSection from './_Event.svelte';
	import WhatSection from './_What.svelte';
	import WhenSection from './_When.svelte';
	import AttributesSection from './_Attributes.svelte';
	import AudienceSection from './_Audience.svelte';
	import ResourcesSection from './_Resources.svelte';
	import SupportSection from './_Support.svelte';
	import WorkshopSection from './_WorkshopDetails.svelte';
	import PrerequisitesSection from './_Prerequisites.svelte';
	import TagsSection from './_Tags.svelte';

	const { isEmpty } = lodash;

	const formattedInitial = formatActivityInitialInput({
		event: {
			id: eventId
		}, // if there is an eventId it will get overwritten
		...initialData
	});

	const dropDownValues = getContext('SESSION_ENUMS');
	let createDisabled = true;
	let eventSelected = events.find((i) => i.id === eventId);

	$: activityTypeSelected = initialData?.type || undefined;
	$: validationSchema = openSpaces;
	$: showLongForm = false;

	$: if (!isEmpty($session.thatProfile)) {
		createDisabled = false;
	}

	function handleEventSelected({ detail }) {
		const { type, startDate, endDate } = detail;

		switch (type) {
			case 'DAILY':
				showLongForm = false;
				validationSchema = openSpaces;
				break;

			case 'ONLINE':
				showLongForm = false;
				validationSchema = online;
				break;

			case 'MULTI_DAY':
			case 'HYBRID_MULTI_DAY':
				if (!isBackdoor && !isEdit) {
					if (dayjs().isBetween(dayjs(startDate).subtract(2, 'week'), dayjs(endDate), 'day')) {
						showLongForm = false;
						validationSchema = openSpaces;
						break;
					}
				}

				switch (activityTypeSelected) {
					case 'REGULAR':
					case 'KEYNOTE':
					case 'PANEL': {
						showLongForm = true;
						validationSchema = standard;
						break;
					}

					case 'WORKSHOP': {
						showLongForm = true;
						validationSchema = workshop;
						break;
					}

					case 'OPEN_SPACE': {
						showLongForm = false;
						validationSchema = openSpaces;
						break;
					}

					default: {
						showLongForm = true;
						validationSchema = standard;
						break;
					}
				}

				break;

			default:
				showLongForm = false;
				validationSchema = openSpaces;
				break;
		}

		eventSelected = { ...detail };
	}

	function handleActivityTypeSelected({ detail }) {
		activityTypeSelected = detail;
		handleEventSelected({ detail: eventSelected });
	}

	function canCancelActivityAction() {
		let results = false;

		if (handleWithdraw) {
			if (dayjs(formattedInitial.startTime).isSameOrAfter(dayjs(), 'day')) results = true;

			if (['SUBMITTED', 'DRAFT'].includes(formattedInitial.status)) results = true;
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
		action={{ title: 'Create Profile', href: '/my/profiles/primary' }}
		returnTo={{ title: 'Return to Activities', href: '/activities' }} />
{:else if !$session.thatProfile?.canFeature}
	<ModalError
		title="Your Profile Isn't Public."
		text="It appears we cannot feature your profile. You need to have a public
    profile to create an activity."
		action={{ title: 'Update Profile', href: '/my/profiles/primary' }}
		returnTo={{ title: 'Return to Activities', href: '/activities' }} />
{/if}

<Form
	schema={validationSchema}
	initialValues={formattedInitial}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	on:reset={handleReset}
	let:isSubmitting
	let:isValid
	let:setValue
	let:values
	let:errors
	let:touched>
	<div>
		<Input hidden name="status" />
	</div>

	<div class="grid grid-cols-1 gap-12 lg:grid-flow-col-dense lg:grid-cols-3">
		<div class="space-y-6 lg:col-span-2 lg:col-start-1">
			<!-- event selector -->
			<section in:fade>
				<SectionTitle
					stepNumber="1"
					title={isBackdoor ? 'Selected Location/Event' : `Select a Location/Event`}
					description={isBackdoor ? '' : 'Where do you want to host this activity?'} />

				<EventSection
					{isBackdoor}
					{events}
					{activeEvents}
					setField={setValue}
					eventId={formattedInitial.event.id}
					on:event-selected={handleEventSelected} />
			</section>

			<!-- what section -->
			<section in:fade class="mt-8">
				<SectionTitle
					stepNumber="2"
					title="Describe this Activity"
					description="Tell everyone about this activity/session." />

				<WhatSection {touched} setField={setValue} eventType={eventSelected.type} />
			</section>

			<section in:fade class="mt-8">
				<SectionTitle
					title="Activity Attributes"
					stepNumber="3"
					description="It's meta data time. Let's add some attributes about this activity to help us best sort and categorize it." />

				<div class:hidden={!showLongForm}>
					<AttributesSection
						initialData={formattedInitial}
						{dropDownValues}
						setField={setValue}
						{touched}
						{errors}
						on:activity-type-selected={handleActivityTypeSelected} />
				</div>

				<div>
					<TagsSection initialData={formattedInitial} setField={setValue} />
				</div>
			</section>

			<section in:fade class:hidden={!showLongForm} class="mt-8">
				<SectionTitle
					title="Target Audience"
					stepNumber="4"
					description="Who will benefit the most from this activity? Who should attend?" />

				<AudienceSection
					{dropDownValues}
					initialData={formattedInitial}
					setField={setValue}
					{touched}
					{errors} />
			</section>

			<section in:fade class:hidden={!showLongForm} class="mt-8">
				<div class:hidden={!['WORKSHOP'].includes(activityTypeSelected)}>
					<SectionTitle
						title="Workshop Details"
						stepNumber="5"
						description="Explain in more detail what this workshop is all about." />

					<WorkshopSection
						initialData={formattedInitial}
						{dropDownValues}
						setField={setValue}
						{touched}
						{errors} />
				</div>
			</section>

			<section class:hidden={!showLongForm}>
				<div class:hidden={!['WORKSHOP', 'REGULAR'].includes(activityTypeSelected)}>
					<PrerequisitesSection isRequired={['WORKSHOP'].includes(activityTypeSelected)} />
				</div>
			</section>

			<section in:fade class="mt-8">
				<SectionTitle
					title="Activity Takeaways and Resources"
					stepNumber="6"
					description="Do you have some supporting resources for folks? Add them here for others to easily reference later." />

				<ResourcesSection
					initialData={formattedInitial}
					{dropDownValues}
					setField={setValue}
					{touched}
					{errors} />
			</section>

			<section in:fade class:hidden={!showLongForm} class="mt-8">
				<SectionTitle
					title="Help us, Help You"
					stepNumber="7"
					description="We want you to be your best you. How can we help?" />

				<SupportSection
					initialData={formattedInitial}
					{dropDownValues}
					setField={setValue}
					{touched}
					{errors} />
			</section>

			<!-- when section -->
			<section in:fade class:hidden={showLongForm} class="mt-8">
				<SectionTitle
					title="Schedule the Time"
					stepNumber="3"
					description="Pick a day and time (in your time zone) you will be hosting this activity." />

				<WhenSection
					{touched}
					{errors}
					values={formattedInitial}
					setField={setValue}
					event={eventSelected} />
			</section>

			{#if isValid === false}
				<ErrorNotificaiton message="Please correct the issues listed above." />
			{/if}

			{#if isSubmitting}
				<div class="flex flex-grow justify-center py-24">
					<Waiting />
				</div>
			{/if}
		</div>

		<section class="relative lg:col-span-1 lg:col-start-3">
			<div class="sticky top-8">
				<Steps isShortForm={!showLongForm}>
					<div slot="actions">
						<div class="flex flex-col space-y-4">
							{#if canCancelActivityAction()}
								<span class="inline-flex rounded-md shadow-sm">
									<button
										disabled={isValid}
										on:click|preventDefault={() => handleWithdraw(initialData)}
										tabindex="-1"
										class="order focus:ring-red w-full rounded-md 
                          border-2 border-transparent bg-red-400
                          py-2 px-4 text-sm font-medium 
                          leading-5
                          text-white 
                          transition 
                          duration-150 ease-in-out hover:bg-red-600 
                          focus:border-red-700 focus:outline-none active:bg-red-700">
										Cancel / Withdraw
									</button>
								</span>
							{/if}

							<span class="inline-flex rounded-md shadow-sm">
								<button
									type="submit"
									class="w-full rounded-md border-2
                      border-thatBlue-500 bg-white py-2
                      px-4 text-sm font-medium 
                    leading-5 text-thatBlue-500 
                    transition duration-150
                      ease-in-out hover:bg-thatBlue-500 hover:text-white focus:border-thatBlue-800 focus:bg-thatBlue-500
                    focus:text-white 
                    focus:outline-none focus:ring-thatBlue-500 active:bg-thatBlue-800">
									{initialData?.id ? 'Update Activity' : 'Submit Activity'}
								</button>
							</span>
						</div>
					</div>
				</Steps>
			</div>
		</section>
	</div>
</Form>
