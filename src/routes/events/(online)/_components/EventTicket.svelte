<script>
	export let event;

	import dayjs from 'dayjs';
	import Icon from 'svelte-awesome';
	import lodash from 'lodash';
	import { commentsO, hashtag, clockO, desktop, users } from '$components/svelte-awesome-icons';
	import { createEventDispatcher } from 'svelte';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	const { keyBy } = lodash;

	import { Standard as StandardButton } from '$elements/buttons';
	import { Check } from '$elements/svgs';

	import ActivityTypes from './ActivityTypes.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	const tickets = event.products
		.filter((f) => f.isEnabled)
		.filter((e) => e.productType === 'TICKET');

	const eventTickets = keyBy(
		tickets.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	const dispatch = createEventDispatcher();
</script>

<div class="overflow-hidden bg-gray-50 py-16 lg:py-24">
	<div class="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="relative">
			<h2
				class="text-center text-3xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-4xl">
				An online event designed for interaction
			</h2>
			<p class="mx-auto mt-6 max-w-5xl text-center text-xl text-gray-500">
				We created THAT to fill a gap between the times when we cannot physically connect. We
				believe peer-to-peer learning is one of the most powerful ways we can help one another any
				day of the year.
			</p>

			<p class="mx-auto mt-8 max-w-3xl text-center text-xl text-gray-500">
				Every month we host THAT Online aimed at bringing us all together to recenter and recharge.
			</p>
		</div>

		<div
			class="relative mt-12 flex flex-col space-y-10 lg:mt-24 lg:flex-row lg:space-y-0 lg:space-x-10">
			<div class="flex flex-col rounded-xl shadow-lg">
				<div class="bg-white px-6 py-8 sm:p-10 sm:pb-6">
					<div class="inline-flex items-center">
						<div>
							<span
								class="rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide text-white">
								THAT Online - Event Ticket
							</span>
						</div>
					</div>
					<div class="mt-4 flex items-baseline text-6xl font-extrabold">
						{#if eventTickets['CLAIMABLE_TICKET'].price === 0}
							Free
						{:else}
							${eventTickets['CLAIMABLE_TICKET'].price}
							<span class="ml-1 text-2xl font-medium text-gray-500"> USD </span>
						{/if}
					</div>
					<p class="mt-5 text-lg text-gray-500">
						{event.name}
					</p>
					<p class="text-lg text-gray-500">
						{dayjs(event.startDate).format('dddd, MMMM D, YYYY - h:mm A z')}
					</p>
					<p class="mt-6 text-lg text-gray-500">
						{eventTickets['VIRTUAL_CAMPER'].description}
					</p>
				</div>
				<div
					class="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
					<ul class="space-y-4">
						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Full Access All Day</p>
						</li>

						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Create and Facilitate Activities</p>
						</li>

						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Join Any Activity</p>
						</li>
					</ul>

					<StandardButton
						on:click={() =>
							dispatch('claim-ticket', { product: { id: eventTickets['CLAIMABLE_TICKET'].id } })}>
						Claim Your Ticket
					</StandardButton>
				</div>
			</div>

			<div class="flex flex-col rounded-xl shadow-lg">
				<div class="bg-white px-6 py-8 sm:p-10 sm:pb-6">
					<div class="inline-flex items-center">
						<div>
							<span
								class="rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide text-white">
								THAT Online - Event Ticket
							</span>
						</div>
					</div>
					<div class="mt-4 flex items-baseline text-6xl font-extrabold">
						${eventTickets['VIRTUAL_CAMPER'].price}
						<span class="ml-1 text-2xl font-medium text-gray-500"> USD </span>
					</div>
					<p class="mt-5 text-lg text-gray-500">
						{event.name}
					</p>
					<p class="text-lg text-gray-500">
						{dayjs(event.startDate).format('dddd, MMMM D, YYYY - h:mm A z')}
					</p>
					<p class="mt-6  text-lg text-gray-500">
						{eventTickets['VIRTUAL_CAMPER'].description}
					</p>
				</div>
				<div
					class="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
					<ul class="space-y-4">
						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Full Access All Day</p>
						</li>

						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Create and Facilitate Activities</p>
						</li>

						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Join Any Activity</p>
						</li>

						<li class="flex items-start">
							<div class="flex-shrink-0">
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">Helps Support Future Platform Growth</p>
						</li>
					</ul>
					<StandardButton on:click={() => dispatch('purchase-event-ticket')}>
						Buy us a Coffee & Claim Ticket
					</StandardButton>
				</div>
			</div>
		</div>

		<div class="relative mt-12  lg:mt-24">
			<div class="flex flex-col">
				<h3 class="text-2xl font-extrabold tracking-tight text-thatBlue-800 sm:text-3xl">
					Built to support the practitioners
				</h3>

				<p class="mt-3 text-lg text-gray-500">
					Nothing will ever replace just talking with someone and learning from each other's
					experiences. Our problems are hard, they require context and that's ok. This is why we've
					created a platform to connect people more authentically, true to peer-to-peer learning.
				</p>
			</div>
			<div>
				<dl class="mt-10 flex flex-col space-y-10 lg:flex-row lg:space-y-0 lg:space-x-10">
					<div class="flex">
						<div class="flex-shrink-0">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-md bg-thatOrange-400 text-white">
								<Icon data={clockO} class="h-8 w-8" />
							</div>
						</div>
						<div class="ml-4">
							<dt class="text-lg font-medium leading-6 text-gray-900">
								24 hours long, each and every time zone.
							</dt>
							<dd class="mt-2 text-base text-gray-500">
								We know you're busy. Rather than complicate your schedule, we're creating an
								opportunity to get involved when it works for you.
							</dd>
						</div>
					</div>

					<div class="flex">
						<div class="flex-shrink-0">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-md bg-thatOrange-400 text-white">
								<Icon data={desktop} class="h-8 w-8" />
							</div>
						</div>
						<div class="ml-4">
							<dt class="text-lg font-medium leading-6 text-gray-900">
								Audio or video and even your desktop.
							</dt>
							<dd class="mt-2 text-base text-gray-500">
								Sometimes all you need is a short conversation and other times you want to share
								your screen and dive deep into code. We're here to support you, your topic in the
								best way possible.
							</dd>
						</div>
					</div>

					<div class="flex">
						<div class="flex-shrink-0">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-md bg-thatOrange-400 text-white">
								<Icon data={users} class="h-8 w-8" />
							</div>
						</div>
						<div class="ml-4">
							<dt class="text-lg font-medium leading-6 text-gray-900">Grow your network.</dt>
							<dd class="mt-2 text-base text-gray-500">
								THAT is a community, not just an event. Events are a reunion, the platform connects
								us, and the conversation happens every day, 365 days a year.
							</dd>
						</div>
					</div>
				</dl>
			</div>
		</div>

		<div class="relative mt-12 sm:mt-16 lg:mt-24">
			<div class="px-4 lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-12">
				<div class="relative mt-10 lg:col-start-1 lg:mt-0">
					<ActivityTypes />
				</div>

				<div class="relative mt-24 lg:col-start-2 lg:mt-0 lg:ml-14">
					<h3 class="text-2xl font-extrabold tracking-tight text-thatBlue-800 sm:text-3xl">
						A platform designed to support us
					</h3>
					<p class="mt-3 text-lg text-gray-500">
						Built to support you; the developer, tester, manager, thought leader, entrepreneur, the
						true practitioner. Designed to help us all support one other while growing together
						without the limitation of time, format, or location.
					</p>

					<dl class="mt-10 space-y-10">
						<div class="flex">
							<div class="flex-shrink-0">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-md bg-thatOrange-400 text-white">
									<Icon data={commentsO} class="h-8 w-8" />
								</div>
							</div>
							<div class="ml-4">
								<dt class="text-lg font-medium leading-6 text-gray-900">
									We're all speakers, practitioners.
								</dt>
								<dd class="mt-2 text-base text-gray-500">
									Do you have a specific technical question or looking to share an experience with
									others? Anyone and everyone are welcome to submit, join, and participate in any
									activity that interests them.
								</dd>
							</div>
						</div>

						<div class="flex">
							<div class="flex-shrink-0">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-md bg-thatOrange-400 text-white">
									<Icon data={hashtag} class="h-8 w-8" />
								</div>
							</div>
							<div class="ml-4">
								<dt class="text-lg font-medium leading-6 text-gray-900">Any topic, any format.</dt>
								<dd class="mt-2 text-base text-gray-500">
									Why create artificial limitations when we don't have to? You create the topics,
									not us. It's your participation that helps drive everyone's growth. It's our
									diversity that helps each of us be our best in all aspects of our work.
								</dd>
							</div>
						</div>
					</dl>
				</div>
			</div>
		</div>
	</div>
</div>
