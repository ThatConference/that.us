<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'; // todo.. totally broke

	import seoMetaTags from '$utils/seo/metaTags';
	import { Badge, CreditCard, Ticket, Membership } from '$elements/svgs';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { ActionHeader } from '$elements';

	import Badges from './_components/_Badges.svelte';
	import OrderHistory from './_components/_OrderHistory.svelte';
	import Tickets from './_components/_Tickets.svelte';
	import MembershipSettings from './_components/_MembershipSettings.svelte';

	const metaTags = seoMetaTags({
		title: 'My Settings - THAT',
		description: 'Your Application Setting.',
		openGraph: {
			type: 'website',
			url: `https://that.us/my/settings`
		},
		nofollow: true,
		noindex: true
	});

	const asideSelected = {
		item: 'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};

	const asideDefault = {
		item: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};

	$: settingsComponent = Badges;

	const isSelected = (component) => {
		let results = asideDefault;

		if (settingsComponent === component) {
			results = asideSelected;
		}

		return results;
	};

	$: switch ($page.params.aside) {
		case 'badges':
			settingsComponent = Badges;
			break;

		case 'membership':
			settingsComponent = MembershipSettings;
			break;

		case 'tickets':
			settingsComponent = Tickets;
			break;

		case 'order-history':
			settingsComponent = OrderHistory;
			break;

		default:
			// goto('/my/profiles/primary'); // todo not sure if we want to do this or not.
			settingsComponent = Badges;
			break;
	}
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Your Settings" />
	</div>

	<div slot="body">
		<main class="-mx-6 relative">
			<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
				<aside class="py-6 lg:col-span-3">
					<div class="sticky top-4">
						<nav>
							<a
								href="/my/settings/badges"
								on:click|preventDefault={() => {
									goto('/my/settings/badges');
									settingsComponent = Badges;
								}}
								class={settingsComponent === Badges ? asideSelected.item : asideDefault.item}
							>
								<Badge
									classes={settingsComponent === Badges ? asideSelected.image : asideDefault.image}
								/>
								<span class="truncate"> Merit Badges </span>
							</a>

							<a
								href="/my/settings/membership"
								on:click|preventDefault={() => {
									goto('/my/settings/membership');
									settingsComponent = MembershipSettings;
								}}
								class={settingsComponent === MembershipSettings
									? asideSelected.item
									: asideDefault.item}
							>
								<Membership
									classes={settingsComponent === MembershipSettings
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Membership Settings </span>
							</a>

							<a
								href="/my/settings/order-history"
								on:click|preventDefault={() => {
									goto('/my/settings/order-history');
									settingsComponent = OrderHistory;
								}}
								class={settingsComponent === OrderHistory ? asideSelected.item : asideDefault.item}
							>
								<CreditCard
									classes={settingsComponent === OrderHistory
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Order History </span>
							</a>

							<a
								href="/my/settings/tickets"
								on:click|preventDefault={() => {
									goto('/my/settings/tickets');
									settingsComponent = Tickets;
								}}
								class={settingsComponent === Tickets ? asideSelected.item : asideDefault.item}
							>
								<Ticket
									classes={settingsComponent === Tickets ? asideSelected.image : asideDefault.image}
								/>
								<span class="truncate"> Event Tickets </span>
							</a>
						</nav>
					</div>
				</aside>

				<div class="divide-y divide-gray-200 lg:col-span-9 py-4 px-4">
					<svelte:component this={settingsComponent} />
				</div>
			</div>
		</main>
	</div>
</StackedLayout>
