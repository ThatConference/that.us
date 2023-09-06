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
			title: 'Networking',
			imageUrl: '/images/characters/what_to_expect_professional_networking.png'
		},
		{
			title: 'Exposure to Industry Leaders',
			imageUrl: '/images/characters/what_to_expect_industry_leaders.png'
		},
		{
			title: '3 Full Days',
			imageUrl: '/images/characters/what_to_expect_4_days.png'
		},
		{
			title: 'Families Welcome',
			imageUrl: '/images/characters/what_to_expect_families_welcome.png'
		},
		{
			title: 'Polyglot',
			imageUrl: '/images/characters/what_to_expect_tech_stack.png'
		}
	];
</script>

<div class="overflow-hidden py-16 lg:py-24">
	<div class="relative mx-auto mt-12 flex max-w-7xl flex-col space-y-8 px-4 sm:px-6 lg:px-8">
		<h2
			class="py-12 text-center text-2xl font-extrabold uppercase text-thatBlue-700 antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
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
