<script>
	import { page } from '$app/stores';

	import Nav from '$components/nav/interiorNav/Top.svelte';

	import { Badge, CreditCard, Ticket, Membership } from '$elements/svgs';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { ActionHeader } from '$elements';

	const asideSelected = {
		item: 'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};

	const asideDefault = {
		item: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};
</script>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Your Settings" />
	</div>

	<div slot="body">
		<main class="relative -mx-6">
			<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
				<aside class="py-6 lg:col-span-3">
					<div class="sticky top-4">
						<nav>
							<a
								href="/my/settings/badges/"
								class={$page.url.pathname.startsWith('/my/settings/badges')
									? asideSelected.item
									: asideDefault.item}
							>
								<Badge
									classes={$page.url.pathname.startsWith('/my/settings/badges')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Merit Badges </span>
							</a>

							<a
								href="/my/settings/membership/"
								class={$page.url.pathname.startsWith('/my/settings/membership')
									? asideSelected.item
									: asideDefault.item}
							>
								<Membership
									classes={$page.url.pathname.startsWith('/my/settings/membership')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Membership Settings </span>
							</a>

							<a
								href="/my/settings/order-history/"
								class={$page.url.pathname.startsWith('/my/settings/order-history')
									? asideSelected.item
									: asideDefault.item}
							>
								<CreditCard
									classes={$page.url.pathname.startsWith('/my/settings/order-history')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Order History </span>
							</a>

							<a
								href="/my/settings/tickets/"
								class={$page.url.pathname.startsWith('/my/settings/tickets')
									? asideSelected.item
									: asideDefault.item}
							>
								<Ticket
									classes={$page.url.pathname.startsWith('/my/settings/tickets')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Event Tickets </span>
							</a>
						</nav>
					</div>
				</aside>

				<div class="divide-y divide-gray-200 py-4 px-4 lg:col-span-9">
					<slot />
				</div>
			</div>
		</main>
	</div>
</StackedLayout>
