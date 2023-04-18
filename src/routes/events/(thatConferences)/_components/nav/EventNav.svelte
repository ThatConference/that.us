<script>
	export let event;

	import { Shell as ShellButton, StandardShell } from '$elements/buttons';
	import NavLink from './components/navLink.svelte';

	function buildUrl(page) {
		return `/events/${event.slug}/${page}/`;
	}

	function buildAnchorLink(anchor) {
		return `/events/${event.slug}#${anchor}`;
	}
</script>

<div class="relative bg-white py-6">
	<div class="mx-auto flex max-w-screen-xl items-center">
		<!-- logo -->
		<div class="cursor">
			<a data-sveltekit-prefetch href="/events/{event.slug}/">
				<img class="h-16" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
			</a>
		</div>

		<!-- links -->
		<div class="ml-12 flex text-sm font-bold">
			<NavLink href={buildUrl('tickets')}>Tickets</NavLink>
			<!-- <NavLink href={buildUrl('speakers')}>Speakers</NavLink> -->
			<NavLink href={buildUrl('schedule')}>Schedule</NavLink>
			<NavLink href={buildUrl('sponsors')}>Sponsors</NavLink>
			<NavLink href={buildAnchorLink('dates')}>Dates</NavLink>
			<NavLink href={buildAnchorLink('faq')}>FAQ</NavLink>
			<NavLink href={buildUrl('travel')}>Travel</NavLink>
		</div>

		<div class="ml-32 flex flex-1 space-x-4">
			<ShellButton>
				<div class="px-4 py-2">
					<a href="/sponsorships/apply/#prospectus"> Sponsorships </a>
				</div>
			</ShellButton>
			<StandardShell>
				<div class="px-4 py-2">
					<a href={buildUrl('tickets')}> Purchase Tickets </a>
				</div>
			</StandardShell>
		</div>
	</div>
</div>
