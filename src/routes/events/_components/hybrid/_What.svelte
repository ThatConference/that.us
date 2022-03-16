<script>
	const expectations = [
		{
			title: '200+ Sessions',
			imageUrl: '/images/characters/what_to_expect_200_speakers.png'
		},
		{
			title: 'Inspirational Keynotes',
			imageUrl: '/images/characters/what_to_expect_inspirational_keynotes.png'
		},
		{
			title: 'Hands-on Learning',
			imageUrl: '/images/characters/what_to_expect_hands_on_learning.png'
		},
		{
			title: 'Professional Networking',
			imageUrl: '/images/characters/what_to_expect_professional_networking.png'
		},
		{
			title: 'Exposure to Industry Leaders',
			imageUrl: '/images/characters/what_to_expect_industry_leaders.png'
		},
		{
			title: '4 Full Days',
			imageUrl: '/images/characters/what_to_expect_4_days.png'
		},
		{
			title: 'All Families Welcome',
			imageUrl: '/images/characters/what_to_expect_families_welcome.png'
		},
		{
			title: 'Array of Tech Stacks',
			imageUrl: '/images/characters/what_to_expect_tech_stack.png'
		}
	];
</script>

<div class="overflow-hidden py-16 lg:py-24">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="relative flex flex-col space-y-8">
			<h2
				class="text-center text-4xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-5xl">
				What Conference? THAT Conference!
			</h2>

			<div class="flex grid-cols-5 flex-col gap-8 lg:grid">
				<div class="col-span-3">
					<p class="prose mt-6 max-w-5xl text-center text-xl text-gray-500">
						THAT Conference is unlike any other technical conference. This unique four-day summer
						camp is full of workshops, sessions, open spaces, family events, and networking, all
						nestled in the gorgeous Kalahari Resort and Waterpark. This family-friendly event is
						comprised of professional and family tracks, so there is something to learn and
						experience at all ages.
					</p>

					<p class="prose mt-10 max-w-3xl text-center text-xl text-gray-500">
						Whether you choose to interact face-to-face and learn from industry leaders, go hands-on
						in our dedicated Maker space, expand your mind through yoga, or network in the hallways
						with THAT incredible community, you choose the avenues that best fulfill your needs. Not
						only is there a variety of learning opportunities, but we also take our camping
						seriously with lots of bacon, a pig roast family dinner, and bonding over the campfire
						to share stories.
					</p>
				</div>
				<div class="col-span-2 flex flex-col justify-center">
					<img
						class="lazyload h-full w-full p-8"
						src="/images/characters/moose_with_lantern.png"
						alt="THAT Moose" />
				</div>
			</div>
		</div>
	</div>

	<div class="relative mx-auto mt-12 flex max-w-7xl flex-col space-y-8 px-4 sm:px-6 lg:px-8">
		<h2
			class="py-12 text-center text-3xl font-extrabold uppercase leading-8 tracking-tight text-gray-500 sm:text-4xl">
			Here's What You Can Expect At That!
		</h2>

		<div class="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-12">
			{#each expectations as e}
				<div class="rounded-lg bg-white p-4 shadow-lg">
					<div class="flex flex-col items-center space-y-4">
						<img class="lazyload h-24 object-contain" src={e.imageUrl} alt="logo" />
						<p class="text-center text-xl font-bold text-gray-500">
							{e.title}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
