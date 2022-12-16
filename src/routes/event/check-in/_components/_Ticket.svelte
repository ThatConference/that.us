<script>
	export let ticket;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import { Shell } from '$elements/buttons';
	import config from '$utils/config.public';
	import { CheckFull } from '$elements/svgs';

	import CheckInModal from './_CheckinModal.svelte';
	import EditCheckinModal from './_EditCheckInModal.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	const { allocatedTo, purchasedBy } = ticket;
	let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';

	let ticketHolder = ticket.isAllocated ? allocatedTo : purchasedBy;
	let checkInClicked = false;
	let editCheckInClicked = false;
	let displayPin = ticket.partnerPin ?? 'PIN not set';
	let tempPin;
</script>

<div
	class="transform overflow-hidden bg-gray-50 bg-opacity-75 px-4 py-4 shadow transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-100 sm:rounded-md sm:px-6"
	class:bg-yellow-100={!ticket.isAllocated}
	class:hover:bg-yellow-200={!ticket.isAllocated}>
	<div class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 md:items-center">
		<div class="flex min-w-0 flex-1 md:items-center">
			<div class="flex-shrink-0">
				<img
					class="lazyload h-12 w-12 rounded-full"
					src={`${ticketHolder.profileImage || config.defaultProfileImage}${imageCrop}`}
					alt="" />
			</div>
			<div class="min-w-0 flex-1 space-y-4 px-4 md:grid md:grid-cols-2 md:gap-4">
				<div>
					<p class="flex text-sm font-extrabold uppercase text-thatBlue-800">
						{ticketHolder.firstName || ''}
						{ticketHolder.lastName || ''}
					</p>
					<p class="mt-2 flex items-center text-sm text-gray-500">
						<svg
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>

						<span class="truncate">{ticketHolder.email || ''}</span>
					</p>
				</div>
				<div class="mt-2 block sm:mt-0">
					<div>
						<p class="flex text-sm font-extrabold text-gray-900">
							{ticket.product.name}
						</p>
						<div class="mt-2 flex items-center space-x-2 text-sm text-gray-500">
							<span class="rounded-full bg-green-300 py-1 px-8  font-extrabold text-white">
								{displayPin}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-col sm:flex-row sm:justify-end">
				{#if !ticket.hasCheckedIn}
					<div class="flex">
						<Shell>
							<button
								type="button"
								class="w-full py-4 px-6 text-sm font-medium leading-5"
								on:click|stopPropagation|preventDefault={() => (checkInClicked = !checkInClicked)}>
								<span class="text-lg">Check-In</span>
							</button>
						</Shell>
					</div>
				{:else}
					<div class="flex">
						<Shell>
							<button
								type="button"
								class="w-full py-4 px-6 text-sm font-medium leading-5"
								on:click|stopPropagation|preventDefault={() =>
									(editCheckInClicked = !editCheckInClicked)}>
								<span class="text-lg">Edit CheckIn</span>
							</button>
						</Shell>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if ticket.hasCheckedIn}
		<div class="flex pt-6 pb-2">
			<div class="flex items-center">
				<div class="flex-shrink-0 pr-4">
					<span
						class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 bg-opacity-60">
						<CheckFull height="h-4" width="w-4" />
					</span>
				</div>
				{#if ticket.checkedInAt}
					<div>
						<span class="font-bold">
							{ticket.checkedInBy.firstName}
							{ticket.checkedInBy.lastName}
						</span>
						checked-in at:
						<time class="pl-2 font-bold" datetime={ticket.orderDate}>
							{dayjs(ticket.checkedInAt).format('dddd, MMMM D, YYYY z @ h:mm A')}
						</time>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

{#if checkInClicked}
	<CheckInModal
		title="THAT Check-In"
		text="Please enter the user's pin."
		eventId={ticket.event.id}
		ticketId={ticket.id}
		bind:returnPin={tempPin}
		on:checkinCompleted={() => {
			checkInClicked = false;
			if (tempPin) displayPin = tempPin;
		}}
		on:close={() => (checkInClicked = false)} />
{/if}

{#if editCheckInClicked}
	<EditCheckinModal
		title="THAT Edit Check-In"
		text="Revert or update a users check-in."
		eventId={ticket.event.id}
		ticketId={ticket.id}
		isOwedShirt={!ticket.receivedSwag}
		bind:returnPin={tempPin}
		on:checkinUpdated={() => {
			editCheckInClicked = false;
			if (tempPin) displayPin = tempPin;
		}}
		on:close={() => (editCheckInClicked = false)} />
{/if}
