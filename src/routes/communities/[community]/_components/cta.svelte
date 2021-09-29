<script>
	export let community;
	export let isFollowing = false;

	const { slug, name } = community;
	const handle = `@${slug}`;

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';
	import { CTA } from '$elements';

	const dispatch = createEventDispatcher();
</script>

<CTA>
	<h2
		class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
    sm:text-4xl sm:leading-10"
	>
		Never miss another
		<span class="text-that-orange">{name}</span>
		Activity!
		<br />
		<span class="text-that-orange">Follow {handle} today!</span>
	</h2>

	<span slot="actionPrimary">
		{#if $session.isAuthenticated}
			<StandardButton class="h-3/4" on:click={() => dispatch('community-follow')}>
				{#if isFollowing}Un-Follow{:else}Follow{/if}
				{handle}
			</StandardButton>
		{:else}
			<StandardLink class="h-3/4" href="/login/">Login and Follow Today</StandardLink>
		{/if}
	</span>
</CTA>
