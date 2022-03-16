<script>
	export let id;
	export let title;
	export let shortDescription;
	export let startTime;

	import Icon from 'svelte-awesome';
	import { caretDown } from '$components/svelte-awesome-icons';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import { truncate, isLongerThan } from '$utils/truncate';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	let expandDescription = false;
</script>

<a href="/activities/{id}/">
	<div
		class="h-full w-full transform rounded-lg bg-that-blue py-10 px-6 text-left shadow transition duration-500
      ease-in-out hover:scale-105 hover:bg-thatBlue-400 xl:px-10">
		<div class="flex h-full w-full flex-col space-y-4 text-white">
			<h1 class="text-lg font-semibold tracking-tight">{title}</h1>

			<div
				class="flex-grow"
				class:cursor-pointer={isLongerThan(shortDescription, 25)}
				on:click|preventDefault|stopPropagation={() => (expandDescription = !expandDescription)}>
				<p class="break-words text-sm leading-5">
					{#if expandDescription}
						<span class="lineBreaks">{shortDescription}</span>
					{:else}
						<div class:hover:text-gray-300={isLongerThan(shortDescription, 25)}>
							<span>{truncate(shortDescription, 25)}</span>
							{#if isLongerThan(shortDescription, 25)}
								<Icon data={caretDown} class="ml-2" />
							{/if}
						</div>
					{/if}
				</p>
			</div>

			<p class="text-sm italic text-thatBlue-200">
				{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}
			</p>
		</div>
	</div>
</a>
