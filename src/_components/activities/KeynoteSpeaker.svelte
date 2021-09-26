<script>
	export let speakers;

	import config from '$utils/config';

	let [host] = speakers;
	let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

	let userProfileImage = host.profileImage
		? `${host.profileImage}${imageCrop}`
		: config.defaultProfileImage;
</script>

<div class="bg-white pb-12">
	<div class="relative z-0">
		<div class="absolute inset-0 h-5/6 bg-thatBlue-800 lg:h-2/3" />
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="relative lg:grid lg:grid-cols-7">
				<div
					class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:row-end-4"
				>
					<div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
						<div class="text-center text-3xl leading-9 font-semibold text-gray-900 sm:-mx-6">
							<a href="/members/{host.profileSlug}" class="flex-shrink-0">
								<span class="inline-block relative">
									<img
										class="w-48 h-48 rounded-full"
										src={userProfileImage}
										alt={`${host.firstName} ${host.lastName}`}
										loading="lazy"
									/>

									{#if host.earnedMeritBadges.length > 0}
										<span class="absolute bottom-0 left-0 block h-20 w-20">
											<img
												src={host.earnedMeritBadges[0].image}
												alt={host.earnedMeritBadges[0].name}
												loading="lazy"
											/>
										</span>
									{/if}
								</span>
							</a>
						</div>

						<div class="mt-4 flex flex-col items-center justify-center">
							<span
								class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-2xl sm:leading-10 lg:text-5xl lg:leading-none"
							>
								<span>{`${host.firstName} ${host.lastName}`}</span>
							</span>

							<span class="py-3 text-xl leading-none tracking-tight text-gray-500 sm:text-xl">
								<span>{`${host.jobTitle} @ ${host.company}`}</span>
							</span>

							<span class="py-3 text-xl leading-none tracking-tight text-gray-500 sm:text-xl">
								<p
									class="ml-3 text-base leading-6 font-medium
                  text-gray-500 text-center"
								>
									{host.bio}
								</p>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
