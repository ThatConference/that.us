<script>
	export let searchterm = '';
	export let tags;
	export let communities;
	export let events = [];
	export let selectedFilterTerms = [];
	export let onThat;
	export let atThat;
	export let family;
	export let professional;
	export let openSpace;
	export let workshop;

	import Icon from 'svelte-awesome';
	import { filter as filterIcon, externalLink } from '$components/svelte-awesome-icons';

	import { StandardLink } from '$elements';
	import SlideOver from '$elements/overlays/BasicSlideOver.svelte';

	import config from '$utils/config.public';

	$: eventsModified = events.filter((e) => e.id !== config.eventId);
</script>

<SlideOver title="Search and Filter" on:click on:clicked-outside>
	<div class="flex items-center justify-center space-x-2" slot="header">
		<span class="text-thatOrange-400">
			<Icon data={filterIcon} label="Filter" class="h-8 w-8" />
		</span>
		<h2 class="text-lg font-medium leading-7 text-gray-900">Activity Filters</h2>
	</div>

	<div class="flex flex-col divide-y divide-gray-400">
		<div class="pb-4">
			<h2 class="text-lg font-medium leading-7 text-gray-900">Text Search</h2>

			<div class="my-2 border-gray-200">
				<input
					class="form-input w-full rounded-md border"
					bind:value={searchterm}
					placeholder="type to search..." />
			</div>
		</div>

		{#if eventsModified.length > 0}
			<div class="pb-2 pt-4">
				<h2 class="text-lg font-medium leading-7 text-gray-900">Events</h2>
				<div class="my-2 border-gray-200">
					<ul>
						{#each eventsModified as event}
							<li>
								<div class="flex cursor-pointer items-center space-x-3 pb-2 hover:text-that-blue">
									<div>
										<Icon data={externalLink} class="h-4 w-4" />
									</div>
									<div>
										<StandardLink href={`/activities/${event.slug}`}>{event.name}</StandardLink>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
		<div class="py-4">
			<h2 class="text-lg font-medium leading-7 text-gray-900">Location</h2>
			<div class="border-gray-200">
				<fieldset class="flex flex-col">
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={atThat} />
						<span class="px-2">AT THAT</span>
					</label>
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={onThat} />
						<span class="px-2">ON THAT</span>
					</label>
				</fieldset>
			</div>
		</div>
		<div class="py-4">
			<h2 class="text-lg font-medium leading-7 text-gray-900">Category</h2>
			<div class="border-gray-200">
				<fieldset class="flex flex-col">
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={family} />
						<span class="px-2">Family</span>
					</label>
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={professional} />
						<span class="px-2">Professional</span>
					</label>
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={openSpace} />
						<span class="px-2">Open Space</span>
					</label>
					<label
						class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-1 lg:mx-0">
						<input type="checkbox" bind:checked={workshop} />
						<span class="px-2">Workshop</span>
					</label>
				</fieldset>
			</div>
		</div>

		<div class="py-4">
			<h2 class="text-lg font-medium leading-7 text-gray-900">Communities</h2>
			<div class="mb-2">
				<fieldset class="flex flex-col">
					{#each communities as community}
						<label
							class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-2 lg:mx-0">
							<input type="checkbox" bind:group={selectedFilterTerms} value="@{community}" />
							<span class="px-2">@{community}</span>
						</label>
					{/each}
				</fieldset>
			</div>
		</div>
		<div class="py-4">
			<h2 class="text-lg font-medium leading-7 text-gray-900">Tags</h2>
			<fieldset class="flex flex-col">
				{#each tags as tag}
					{#if tag.charAt(0) !== '@'}
						<label
							class="md:text-md whitespace-nowrap text-base capitalize text-gray-500 sm:text-lg md:mt-2 lg:mx-0">
							<input type="checkbox" bind:group={selectedFilterTerms} value={tag} />
							<span class="px-2">{tag}</span>
						</label>
					{/if}
				{/each}
			</fieldset>
		</div>
	</div>
	<div slot="panelActions">
		{#if selectedFilterTerms.length}
			<button
				type="button"
				class="focus:ring-blue rounded-md border border-gray-300 px-4 py-2 text-sm
        font-medium leading-5 text-gray-700 transition
        duration-150 ease-in-out hover:text-gray-500
        focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800"
				on:click={() => {
					selectedFilterTerms = [];
				}}>
				{`Clear ${selectedFilterTerms.length} selected filter${
					selectedFilterTerms.length > 1 ? 's' : ''
				}`}
			</button>
		{/if}
	</div>
</SlideOver>
