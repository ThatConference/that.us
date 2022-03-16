<script>
	export let eventId;

	import { session } from '$app/stores';
	import Icon from 'svelte-awesome';
	import { plusCircle } from '$components/svelte-awesome-icons';

	import { imageCrops } from '$utils/config';

	const baseSlug = '/activities/create/';

	let isHover = false;
	let createLink = eventId ? `${baseSlug}#/event/${eventId}` : baseSlug;
</script>

<a href={createLink}>
	<div
		class="h-full w-full transform rounded-lg bg-that-blue py-10 px-6 text-center shadow transition duration-500
      ease-in-out hover:scale-105 hover:bg-thatBlue-400 xl:px-10 xl:text-left"
		on:mouseenter={() => (isHover = true)}
		on:mouseleave={() => (isHover = false)}>
		<div class="space-y-6 xl:space-y-10">
			<div class="flex justify-center">
				{#if $session.isAuthenticated && $session.thatProfile}
					{#if isHover}
						<Icon data={plusCircle} class="h-40 w-40 text-thatBlue-100 xl:h-56 xl:w-56" />
					{:else}
						<img
							class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
							src={`${$session.thatProfile.profileImage}${imageCrops.profile}`}
							alt={`${$session.thatProfile.firstName} ${$session.thatProfile.lastName}`} />
					{/if}
				{:else}
					<Icon data={plusCircle} class="text-thatBlue-100 h-40 w-40 xl:w-56 xl:h-56" />
				{/if}
			</div>

			<div class="flex h-full w-full flex-col space-y-2 text-lg font-medium leading-6">
				<h4 class="flex-grow space-y-1 text-white">What Activity will you create?</h4>
				<p class="text-sm italic text-thatBlue-200">Any Day, Any Time</p>

				<span class="text-right text-thatBlue-200">
					{#if $session.isAuthenticated && $session.thatProfile}
						<p>{`${$session.thatProfile.firstName} ${$session.thatProfile.lastName}`}</p>
					{:else}
						<p>Your Name Here :)</p>
					{/if}
				</span>
			</div>
		</div>
	</div>
</a>
