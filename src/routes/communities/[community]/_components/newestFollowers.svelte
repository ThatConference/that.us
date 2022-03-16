<script>
	export let followers = [];

	import { Avatars } from '$elements';
</script>

<section class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="my-24 lg:grid lg:grid-cols-12 lg:gap-8">
		<div class="text-center md:mx-auto md:max-w-2xl lg:col-span-3">
			<h2
				class="my-2 text-3xl font-extrabold leading-8 tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10">
				Newest Followers
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
