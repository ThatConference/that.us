<script>
	export let posts;

	import { fade } from 'svelte/transition';

	import { Standard as StandardLink } from '$elements/links';
	import Card from './components/blogCard.svelte';
</script>

<div class="relative py-16 sm:py-24">
	<div class="relative">
		<div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
			<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">THAT BLOG</h2>
			<p
				class="mt-2 text-2xl font-extrabold uppercase text-thatBlue-700 antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
				Announcements, Updates and Words
			</p>
			<p class="mx-auto my-24 max-w-prose text-xl text-gray-500">
				<StandardLink href="/blog/">View All Blog Posts</StandardLink>
			</p>
		</div>

		<div class="mx-auto mt-24 max-w-md sm:max-w-lg lg:max-w-7xl">
			<div class="grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8 ">
				{#each posts as post, i}
					<div in:fade={{ delay: i * 200, duration: 500 }}>
						<Card metadata={post.metadata} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
