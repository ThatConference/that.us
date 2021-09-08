<script>
	export let community;
	export let isFollowing = false;

	const { slug, name } = community;
	const handle = `@${slug}`;

	import { createEventDispatcher } from 'svelte';

	import { getAuth } from '$utils/security';
	import { Standard as StandardButton } from '$elements/buttons';
	import { CTA } from '$elements';

	const { isAuthenticated, login } = getAuth();
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
		{#if $isAuthenticated}
			<StandardButton class="h-3/4" on:click={() => dispatch('community-follow')}>
				{#if isFollowing}Un-Follow{:else}Follow{/if}
				{handle}
			</StandardButton>
		{:else}
			<StandardButton class="h-3/4" on:click={() => login(`/communities/${slug}`)}>
				Login and Follow Today
			</StandardButton>
		{/if}
	</span>
</CTA>
