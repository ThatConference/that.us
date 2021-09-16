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

<div class="py-16 overflow-hidden lg:py-24">
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
		<div class="relative flex flex-col space-y-8">
			<h2
				class="text-center text-4xl sm:text-5xl leading-8 font-extrabold tracking-tight text-thatBlue-800"
			>
				What Conference? THAT Conference!
			</h2>

			<div class="flex flex-col lg:grid grid-cols-5 gap-8">
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
						class="p-8 h-full w-full"
						src="/images/characters/moose_with_lantern.png"
						alt="THAT Moose"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="relative max-w-7xl mx-auto mt-12 flex flex-col space-y-8 px-4 sm:px-6 lg:px-8">
		<h2
			class="text-center text-3xl sm:text-4xl leading-8 font-extrabold tracking-tight uppercase text-gray-500 py-12"
		>
			Here's What You Can Expect At That!
		</h2>

		<div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
			{#each expectations as e}
				<div class="p-4 bg-white rounded-lg shadow-lg">
					<div class="flex flex-col items-center space-y-4">
						<img class="h-24 object-contain" src={e.imageUrl} alt="logo" loading="lazy" />
						<p class="font-bold text-gray-500 text-xl text-center">
							{e.title}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
