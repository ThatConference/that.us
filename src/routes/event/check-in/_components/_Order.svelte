<script>
	export let registration;

	import dayjs from 'dayjs';

	import config from '$utils/config';
	import { Chevron } from '$elements/svgs';
	import Ticket from './_Ticket.svelte';

	let userClicked = false;
	const { member } = registration;
	let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';
</script>

<button
	type="button"
	class="w-full hover:bg-gray-50"
	on:click|preventDefault={() => (userClicked = !userClicked)}
>
	<div class="flex flex-col">
		<div class="flex items-center">
			<div class="flex min-w-0 flex-1 items-center">
				<div class="flex-shrink-0">
					<img
						class="lazyload h-12 w-12 rounded-full"
						src={`${member.profileImage || config.defaultProfileImage}${imageCrop}`}
						alt=""
					/>
				</div>
				<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
					<div>
						<p class="flex text-sm font-extrabold uppercase text-thatBlue-800">
							{member.firstName}
							{member.lastName}
						</p>
						<p class="mt-2 flex items-center text-sm text-gray-500">
							<svg
								class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
							</svg>

							<span class="truncate">{member.email}</span>
						</p>
					</div>
					<div class="hidden md:block">
						<div>
							<p class="flex text-sm text-gray-900">
								Purchased On:
								<time class="pl-2 font-extrabold" datetime={registration.orderDate}>
									{dayjs(registration.orderDate).format('dddd, MMMM D, YYYY - h:mm A')}
								</time>
							</p>
							<div class="mt-2 flex items-center space-x-2 text-sm text-gray-500">
								<span class="rounded-full bg-green-300 py-1 px-8  font-extrabold text-white">
									{registration.orderAllocations.length}
								</span>
								<span>
									{registration.orderAllocations.length > 1 ? 'tickets' : 'ticket'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Chevron />
			</div>
		</div>

		{#if userClicked}
			<div>
				<div class="my-4 border-t-2" />
				<div class="flex flex-col sm:mx-12">
					<ul class="space-y-4">
						{#each registration.orderAllocations as ticket}
							<li>
								<Ticket {ticket} />
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>
</button>
