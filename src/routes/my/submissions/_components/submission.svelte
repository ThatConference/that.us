<script>
	export let activity;

	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import Icon from 'svelte-awesome';
	import { pencilSquareO, clone } from '$components/svelte-awesome-icons';

	import { CheckFull, Ban, Warning } from '$elements/svgs';
	import { Shell as ShellButton } from '$elements/buttons';

	function handleHoverClick() {
		if (activity.status === 'ACCEPTED') goto(`/activities/${activity.id}`);
		else goto(`/activities/edit/${activity.id}`);
	}
	function formatEventDisplay(activity) {
		let eventName = activity.event.name || '';
		if (eventName === 'Daily THAT') {
			return eventName;
		} else {
			return eventName + ' ' + activity.event.year || '';
		}
	}
</script>

<li>
	<button type="button" on:click={handleHoverClick} class="block w-full hover:bg-gray-50">
		<div class="flex items-center px-4 py-4 sm:px-6">
			<div class="flex min-w-0 flex-1 items-center">
				<div class="md:gap- min-w-0 flex-1 px-4 md:grid md:grid-cols-7">
					<div class="col-span-3">
						<p class="flex items-start truncate text-sm font-medium text-thatBlue-700">
							{activity.title}
						</p>
						<p class="mt-2 flex items-start text-sm text-gray-500">
							<span class="truncate">{activity.shortDescription}</span>
						</p>
					</div>
					<div class="col-span-2 hidden md:block">
						<div>
							<p class="flex items-start text-sm text-gray-900">
								Submitted:
								<time class="ml-1.5" datetime="2020-01-07"
									>{dayjs(activity.createdAt).format('MMMM D, YYYY')}</time>
							</p>
							<p class="mt-2 flex items-start text-sm text-gray-500">
								{#if ['WITHDREW', 'CANCELLED'].includes(activity.status)}
									<div class="flex items-center">
										<Ban classes="mr-1.5 h-5 w-5" />
										<span>{activity.status}</span>
									</div>
								{:else if activity.status === 'ACCEPTED'}
									<span
										class="mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 ring-8 ring-white">
										<CheckFull />
									</span>
									<span>{activity.status}</span>
								{:else}
									<div>
										<div class="flex items-center">
											<Warning classes="text-yellow-500 mr-1.5 h-5 w-5" />
											<span>PENDING REVIEW</span>
										</div>
									</div>
								{/if}
							</p>
						</div>
					</div>
					<div class="col-span-2 hidden md:block">
						<div>
							<p class="flex text-sm text-gray-900">
								<time datetime="2020-01-07">
									{#if activity.startTime}
										{dayjs(activity.startTime).format(`dddd, MMMM D, 'YY - h:mm A`)}
									{/if}
								</time>
							</p>
							<p class="mt-2 flex items-center text-sm text-gray-500">
								<span>{formatEventDisplay(activity)}</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="flex flex-col space-y-4">
					<ShellButton>
						<a
							href={`/activities/edit/${activity.id}`}
							class="w-full px-8 py-1 text-sm font-medium leading-5 md:px-10 ">
							<span>
								<Icon data={pencilSquareO} class="-ml-1 mr-2 h-4 w-4" />
							</span>
							Edit
						</a>
					</ShellButton>
					<ShellButton>
						<a
							href={`/activities/clone/?id=${activity.id}`}
							class="w-full px-8 py-1 text-sm font-medium leading-5 md:px-10 ">
							<span>
								<Icon data={clone} class="-ml-1 mr-2 h-4 w-4" />
							</span>
							Clone
						</a>
					</ShellButton>
				</div>
			</div>
		</div>
	</button>
</li>
