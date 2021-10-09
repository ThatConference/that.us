<script>
	export let ticket;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import { Shell } from '$elements/buttons';
	import config from '$utils/config';
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
</script>

<div
	class="bg-gray-50 bg-opacity-75 hover:bg-gray-100 shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md transition duration-500 ease-in-out transform hover:scale-105"
	class:bg-yellow-100={!ticket.isAllocated}
	class:hover:bg-yellow-200={!ticket.isAllocated}
>
	<div class="flex items-center">
		<div class="min-w-0 flex-1 flex items-center">
			<div class="flex-shrink-0">
				<img
					loading="lazy"
					class="h-12 w-12 rounded-full"
					src={`${ticketHolder.profileImage || config.defaultProfileImage}${imageCrop}`}
					alt=""
				/>
			</div>
			<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
				<div>
					<p class="flex text-sm font-extrabold text-thatBlue-800 uppercase">
						{ticketHolder.firstName || ''}
						{ticketHolder.lastName || ''}
					</p>
					<p class="mt-2 flex items-center text-sm text-gray-500">
						<svg
							class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>

						<span class="truncate">{ticketHolder.email || ''}</span>
					</p>
				</div>
				<div class="block mt-2 sm:mt-0">
					<div>
						<p class="flex text-sm font-extrabold text-gray-900">
							{ticket.product.name}
						</p>
						<div class="mt-2 flex items-center text-sm text-gray-500 space-x-2">
							<span class="rounded-full py-1 px-8 bg-green-300  text-white font-extrabold">
								{ticket.partnerPin ? ticket.partnerPin : 'unassigned'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="flex sm:justify-end">
				{#if !ticket.hasCheckedIn}
					<div class="flex">
						<Shell>
							<button
								class="w-full py-4 px-6 text-sm leading-5 font-medium"
								on:click|stopPropagation|preventDefault={() => (checkInClicked = !checkInClicked)}
							>
								<span class="text-lg">Check-In</span>
							</button>
						</Shell>
					</div>
				{:else}
					<div class="flex">
						<Shell>
							<button
								class="w-full py-4 px-6 text-sm leading-5 font-medium"
								on:click|stopPropagation|preventDefault={() =>
									(editCheckInClicked = !editCheckInClicked)}
							>
								<span class="text-lg">Edit CheckIn</span>
							</button>
						</Shell>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if ticket.hasCheckedIn}
		<div class="pt-6 pb-2 flex">
			<div class="flex items-center">
				<div class="flex-shrink-0 pr-4">
					<span
						class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center"
					>
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
		on:checkinCompleted={(e) => {
			checkInClicked = false;
		}}
		on:close={() => (checkInClicked = false)}
	/>
{/if}

{#if editCheckInClicked}
	<EditCheckinModal
		title="THAT Edit Check-In"
		text="Revert or update a users checkin."
		eventId={ticket.event.id}
		ticketId={ticket.id}
		isOwedShirt={!ticket.receivedSwag}
		on:checkinUpdated={(e) => {
			editCheckInClicked = false;
		}}
		on:close={() => (editCheckInClicked = false)}
	/>
{/if}
