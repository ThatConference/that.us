<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ActionHeader } from '$elements';
	import { User } from '$elements/svgs';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	const metaTags = ((title = 'My Network - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your Network.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/network`
			},
			nofollow: true,
			noindex: true
		})
	}))();

	const asideSelected = {
		item: 'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};

	const asideDefault = {
		item: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Your Network" />
	</div>

	<div slot="body">
		<main class="-mx-6 relative">
			<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
				<aside class="py-6 lg:col-span-3">
					<div class="sticky top-4">
						<nav>
							<a
								href="/my/network/sponsors/"
								class={$page.path.startsWith('/my/network/sponsors')
									? asideSelected.item
									: asideDefault.item}
							>
								<User
									classes={$page.path.startsWith('/my/network/sponsors')
										? asideSelected.image
										: asideDefault.image}
								/>
								<span class="truncate"> Sponsor Network </span>
							</a>
						</nav>
					</div>
				</aside>

				<div class="divide-y divide-gray-200 lg:col-span-9 py-4 px-4">
					<slot />
				</div>
			</div>
		</main>
	</div>
</StackedLayout>
