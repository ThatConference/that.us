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
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="relative lg:grid lg:grid-cols-7">
				<div
					class="mx-auto mt-10 max-w-lg lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none"
				>
					<div class="rounded-t-lg bg-white px-6 pt-12 pb-10">
						<div class="text-center text-3xl font-semibold leading-9 text-gray-900 sm:-mx-6">
							<a href="/members/{host.profileSlug}/" class="flex-shrink-0">
								<span class="relative inline-block">
									<img
										class="lazyload h-48 w-48 rounded-full"
										src={userProfileImage}
										alt={`${host.firstName} ${host.lastName}`}
									/>

									{#if host.earnedMeritBadges.length > 0}
										<span class="absolute bottom-0 left-0 block h-20 w-20">
											<img
												class="lazyload"
												src={host.earnedMeritBadges[0].image}
												alt={host.earnedMeritBadges[0].name}
											/>
										</span>
									{/if}
								</span>
							</a>
						</div>

						<div class="mt-4 flex flex-col items-center justify-center">
							<span
								class="text-3xl font-extrabold leading-9 text-gray-900 sm:text-2xl sm:leading-10 lg:text-5xl lg:leading-none"
							>
								<span>{`${host.firstName} ${host.lastName}`}</span>
							</span>

							<span class="py-3 text-xl leading-none tracking-tight text-gray-500 sm:text-xl">
								<span>{`${host.jobTitle} @ ${host.company}`}</span>
							</span>

							<span class="py-3 text-xl leading-none tracking-tight text-gray-500 sm:text-xl">
								<p
									class="ml-3 text-center text-base font-medium
                  leading-6 text-gray-500"
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
