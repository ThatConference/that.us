<script>
	export let discord;
	export let showModal = false;

	import { Action as ActionModal } from '$elements/modals';
	import { Standard as StandardLink } from '$elements/links';
	import { clickOutside } from '$elements/actions';
</script>

<ActionModal
	title="Leaving THAT.us site"
	text="THAT.us Activities are hosted on <span class='font-bold'>Discord</span>. Please use the
appropriate link below to get started.">
	<div
		class="flex justify-center space-x-6"
		use:clickOutside
		on:click_outside={() => (showModal = false)}>
		<StandardLink href={discord.channelUrl} target="_blank" on:click={() => (showModal = false)}
			>Go as Discord Member</StandardLink>
		<StandardLink href={discord.inviteUrl} target="_blank" on:click={() => (showModal = false)}
			>Go using Discord Invite</StandardLink>
	</div>
</ActionModal>
