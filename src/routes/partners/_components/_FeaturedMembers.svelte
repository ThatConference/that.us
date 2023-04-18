<script>
	export let members = [];

	import config from '$utils/config.public';

	let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';
</script>

<div class="bg-that-offWhite bg-opacity-50">
	<div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
			<div class="space-y-5 sm:space-y-4">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-thatBlue-800 sm:text-4xl">
					Meet our team
				</h2>
				<p class="text-xl leading-7 text-gray-500">
					Here are just some of the great folks you can find and chat with around THAT.
				</p>
			</div>
			<div class="lg:col-span-2">
				<ul class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
					{#each members.filter((m) => !!m) as member}
						<li
							class="transform cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<a href="/members/{member.profileSlug}/">
								<div class="flex items-center space-x-4 lg:space-x-6">
									<img
										class="lazyload h-16 w-16 rounded-full lg:h-24 lg:w-24"
										src={`${member.profileImage || config.defaultProfileImage}${imageCrop}`}
										alt={`${member.firstName} ${member.lastName}`} />
									<div class="space-y-1 text-lg font-medium leading-6">
										<h4>{`${member.firstName} ${member.lastName}`}</h4>
										<p class="text-that-orange">{member.jobTitle}</p>
									</div>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
