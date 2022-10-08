<script>
	export let event;
	import { page } from '$app/stores';
	import lodash from 'lodash';
	import Headroom from 'svelte-headroom';

	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';

	import NavHat from './NavHat.svelte';
	import EventNav from './EventNav.svelte';

	import MobileNavHat from './MobileNavHat.svelte';
	import MobileEventNav from './MobileEventNav.svelte';

	const { isEmpty } = lodash;
	let hidden = true;

	function handleShow({ detail }) {
		hidden = detail;
	}
</script>

<Headroom
	offset={30}
	on:unpin={() => {
		if (!hidden) hidden = !hidden;
	}}>
	<nav class="relative">
		{#if $page.data.user.isAuthenticated}
			{#if isEmpty($page.data.user.profile)}
				<CreateProfileNotification />
			{/if}
		{/if}

		<div class="block xl:hidden">
			<MobileNavHat {event} />
			<MobileEventNav {hidden} {event} on:show={handleShow} />
		</div>

		<div class="hidden xl:block">
			<NavHat {event} />
			<EventNav {event} />
		</div>
	</nav>
</Headroom>
