<script>
	export let milestones;

	import lodash from 'lodash';
	import dayjs from 'dayjs';

	const milestoneMonths = lodash(milestones)
		.groupBy(({ dueDate }) => dayjs(dueDate).format('M/YYYY'))
		.sortBy(({ dueDate }) => dayjs(dueDate).format('YYYY'))
		.value();
</script>

<div class="my-24">
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
		<div class="lg:grid lg:grid-cols-1 lg:gap-32 lg:items-start">
			<!-- left side -->
			<div class="mt-8 flex flex-col space-y-12">
				<div class="flex items-center space-x-12">
					<div class="w-full">
						<h2
							class="text-center sm:text-left font-extrabold uppercase text-gray-500 text-2xl sm:text-3xl lg:text-4xl"
						>
							Key Dates You Need To Know
						</h2>
					</div>

					<div class="hidden sm:block">
						<img
							src="/images/characters/what_to_expect_4_days.png"
							class="h-24"
							alt="a calendar"
							loading="lazy"
						/>
					</div>
				</div>

				<div>
					<div class="divide-y divide-gray-200">
						<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12">
							{#each milestoneMonths as month}
								<div class="p-4 bg-white rounded-xl shadow-lg">
									<div class="pb-4">
										<h2 class="font-extrabold text-gray-500 text-2xl text-center">
											{dayjs(month[0].dueDate).format('MMMM YYYY')}
										</h2>
									</div>

									{#each month as milestone}
										<div class="flex flex-col space-y-4">
											<div class="prose-lg text-gray-500 flex space-x-4">
												<div>
													{dayjs(milestone.dueDate).format('MM/DD/YY')}
												</div>
												<div>
													{milestone.title}
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
