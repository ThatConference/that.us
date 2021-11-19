<script>
	export let posts;

	import { fade } from 'svelte/transition';

	import { Standard as StandardLink } from '$elements/links';
	import Card from './components/blogCard.svelte';
</script>

<div class="relative py-16 sm:py-24">
	<div class="relative">
		<div class="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
			<h2 class="text-base font-semibold tracking-wider text-thatOrange-400 uppercase">
				THAT BLOG
			</h2>
			<p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
				The Latest Announcemnts, Updates and Words
			</p>
			<p class="my-24 mx-auto max-w-prose text-xl text-gray-500">
				<StandardLink href="/blog/">View All Blog Posts</StandardLink>
			</p>
		</div>

		<div class="mt-24 mx-auto max-w-md sm:max-w-lg lg:max-w-7xl">
			<div class="px-4 sm:px-6 lg:px-8 grid gap-8 grid-cols-1 lg:grid-cols-3 ">
				{#each posts as post, i}
					<div in:fade={{ delay: i * 200, duration: 500 }}>
						<Card metadata={post.metadata} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
