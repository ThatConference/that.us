<script>
	export let activity;

	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import Icon from 'svelte-awesome';
	import { cog } from 'svelte-awesome/icons';

	import { CheckFull, Ban, Warning } from '$elements/svgs';
	import { Shell as ShellButton } from '$elements/buttons';

	function handleHoverClick() {
		if (activity.status === 'ACCEPTED') goto(`/activities/${activity.id}`);
		else goto(`/activities/edit/${activity.id}`);
	}
</script>

<li>
	<a on:click={handleHoverClick} class="w-full block hover:bg-gray-50">
		<div class="flex items-center px-4 py-4 sm:px-6">
			<div class="min-w-0 flex-1 flex items-center">
				<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-7 md:gap-4">
					<div class="col-span-3">
						<p class="text-sm font-medium text-thatBlue-700  truncate">
							{activity.title}
						</p>
						<p class="mt-2 flex items-center text-sm text-gray-500">
							<span class="truncate">{activity.shortDescription}</span>
						</p>
					</div>
					<div class="col-span-2 hidden md:block">
						<div>
							<p class="text-sm text-gray-900">
								Submitted:
								<time datetime="2020-01-07">{dayjs(activity.createdAt).format('MMMM D, YYYY')}</time
								>
							</p>
							<p class="mt-2 flex items-center text-sm text-gray-500">
								{#if ['WITHDREW', 'CANCELLED'].includes(activity.status)}
									<Ban classes="mr-1.5 h-5 w-5" />
								{:else if activity.status === 'ACCEPTED'}
									<span
										class="h-5 w-5 mr-1.5 rounded-full bg-green-400 flex items-center justify-center ring-8 ring-white"
									>
										<CheckFull />
									</span>
								{:else}
									<Warning classes="mr-1.5 h-5 w-5" />
								{/if}
								{activity.status}
							</p>
						</div>
					</div>
					<div class="col-span-2 hidden md:block">
						<div>
							<p class="text-sm text-gray-900">
								<time datetime="2020-01-07">
									{#if activity.startTime}
										{dayjs(activity.startTime).format(`dddd, MMMM D, 'YY - h:mm A`)}
									{/if}
								</time>
							</p>
							<p class="mt-2 flex items-center text-sm text-gray-500">
								<span>{activity.location || ''}</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="flex-none">
					<ShellButton>
						<a
							href={`/activities/edit/${activity.id}`}
							on:click|stopPropagation|preventDefault={() =>
								goto(`/activities/edit/${activity.id}`)}
							class="w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium "
						>
							<span>
								<Icon data={cog} class="-ml-1 mr-2 h-4 w-4" />
							</span>
							Edit
						</a>
					</ShellButton>
				</div>
			</div>
		</div>
	</a>
</li>
