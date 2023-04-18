<script>
	export let followers = [];

	import { Avatars } from '$elements';
</script>

<div class="bg-that-offWhite bg-opacity-50">
	<section class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
		<div class="lg:grid lg:grid-cols-12 lg:gap-8">
			<div class="text-center md:mx-auto md:max-w-2xl lg:col-span-3">
				<h2
					class="my-2 text-3xl font-extrabold leading-8 tracking-tight
      text-gray-900 sm:text-4xl sm:leading-10">
					My Followers
				</h2>
			</div>

			<div class="lg:col-span-9 lg:col-start-4">
				<div class="flex flex-col">
					<div class="my-8 lg:my-0">
						<Avatars attendees={followers} />
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
