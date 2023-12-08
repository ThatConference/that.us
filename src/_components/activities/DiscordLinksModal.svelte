<script>
	export let discord;
	export let showModal = false;

	import { Action as ActionModal } from '$elements/modals';
	import { Standard as StandardLink } from '$elements/links';
	import { clickOutside } from '$elements/actions';
</script>

<ActionModal
	title="Leaving THAT.us site"
	text="THAT Open Spaces are now hosted in <span class='font-bold'>Discord</span> as dedicated voice channels. Please use the
appropriate link below to get started and join. Please note: you have to be a member of THAT Discord to join.">
	<div
		class="flex justify-center space-x-6"
		use:clickOutside
		on:click_outside={() => (showModal = false)}>
		<StandardLink href={discord.channelUrl} target="_blank" on:click={() => (showModal = false)}
			>Join Channel</StandardLink>
		<StandardLink href={discord.inviteUrl} target="_blank" on:click={() => (showModal = false)}
			>I need a Discord invite.</StandardLink>
	</div>
</ActionModal>
