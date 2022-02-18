<script>
	import { page, session } from '$app/stores'; // todo.. totally broke

	import lodash from 'lodash';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import { ActionHeader } from '$elements';
	import { User, Badge, Slack } from '$elements/svgs';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	const { isEmpty } = lodash;

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
		<ActionHeader title="Your Profiles" />
	</div>

	<div slot="body">
		<main class="relative -mx-6">
			<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
				<aside class="py-6 lg:col-span-3">
					<div class="sticky top-4">
						<nav>
							<a
								href="/my/profiles/primary/"
								class={$page.url.pathname.startsWith('/my/profiles/primary')
									? asideSelected.item
									: asideDefault.item}
							>
								<User
									classes={$page.url.pathname.startsWith('/my/profiles/primary')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Your Profile </span>
							</a>

							{#if !isEmpty($session.thatProfile)}
								<a
									href="/my/profiles/shared/"
									class={$page.url.pathname.startsWith('/my/profiles/shared')
										? asideSelected.item
										: asideDefault.item}
								>
									<Badge
										classes={$page.url.pathname.startsWith('/my/profiles/shared')
											? asideSelected.image
											: asideDefault.image}
									/>
									<span class="truncate">Shared Profile </span>
								</a>

								<a
									href="/my/profiles/emergency-contact/"
									class={$page.url.pathname.startsWith('/my/profiles/emergency-contact')
										? asideSelected.item
										: asideDefault.item}
								>
									<User
										classes={$page.url.pathname.startsWith('/my/profiles/emergency-contact')
											? asideSelected.image
											: asideDefault.image}
									/>
									<span class="truncate">Emergency Contact</span>
								</a>

								<a
									href="/my/profiles/slack/"
									class={$page.url.pathname.startsWith('/my/profiles/slack')
										? asideSelected.item
										: asideDefault.item}
								>
									<Slack
										classes={$page.url.pathname.startsWith('/my/profiles/slack')
											? asideSelected.image
											: asideDefault.image}
									/>
									<span class="truncate">Join Slack</span>
								</a>
							{/if}
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
