<script>
	export let meritBadges = [];
</script>

<section class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="my-24 lg:grid lg:grid-cols-12 lg:gap-8">
		<div class="w-full lg:col-span-4">
			<h2
				class="my-2 text-3xl font-extrabold leading-9 tracking-tight
              text-gray-900 sm:text-4xl sm:leading-10"
			>
				My Merit Badges
			</h2>
		</div>

		<div class="lg:col-span-9 lg:col-start-5">
			<div class="my-8 lg:my-0">
				<div class="flex justify-center space-x-4 lg:justify-start">
					{#each meritBadges as badge}
						<div class="flex flex-col items-center">
							<img
								class="lazyload h-24 w-24"
								src={badge.image}
								alt={badge.name}
								title={badge.name}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
