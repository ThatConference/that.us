<script>
	export let members = [];

	import { Standard as StandardLink } from '$elements/links';
	import MemberCard from '$components/members/MemberCard.svelte';
</script>

<section class="relative py-12 lg:py-16">
	<div class="hidden overflow-x-hidden lg:absolute lg:inset-0 lg:block">
		<svg
			class="absolute top-0 right-1/2 -translate-x-64 translate-y-64 transform"
			width="640"
			height="784"
			fill="none"
			viewBox="0 0 640 784">
			<defs>
				<pattern
					id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
					x="118"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="4" height="4" class="text-thatBlue-100" fill="currentColor" />
				</pattern>
			</defs>
			<rect
				y="72"
				width="640"
				height="640"
				class="text-thatBlue-100 opacity-25"
				fill="currentColor" />
			<rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
		</svg>
	</div>

	<div class="mx-auto max-w-screen-xl px-8">
		<div class="relative py-20 text-left">
			<h3
				class="text-4xl font-semibold leading-10 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-none">
				Welcome to THAT family!
			</h3>
			<p class="mt-4 text-xl leading-7 text-gray-500">
				Please join us in welcoming the newest Geeks to THAT. Not a member yet?

				<a href="/membership/" class="text-thatOrange-400 hover:text-thatOrange-500">
					Join today!
				</a>
			</p>
		</div>

		<div class="relative">
			<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each members as m (m.id)}
					<li class="col-span-1">
						<MemberCard {...m} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative flex justify-end py-12">
			<StandardLink href="/members/">View Everyone</StandardLink>
		</div>
	</div>
</section>
