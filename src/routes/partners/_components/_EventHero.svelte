<script>
	export let event;
</script>

<div class="px-4 relative">
	<div class="max-w-7xl mx-auto w-full">
		<div class="flex flex-col sm:flex-row sm:justify-around justify-center items-center">
			<div class="max-w-3xl flex flex-col space-y-4">
				<h1 class="font-extrabold uppercase text-thatBlue-500 text-3xl sm:text-5xl">
					{event.name} <br />
					Partners and Sponsors
				</h1>

				<div class="font-extrabold">
					<p class="text-xl sm:text-3xl tracking-tight text-gray-500">
						Thank you helping make THAT possible.
					</p>
				</div>

				<p class="text-xl sm:text-3xl tracking-tight text-gray-500">
					Learn more below about each of our great partners and sponsors and see what each has to
					offer.
				</p>
			</div>

			<div class="mt-12 sm:mt-0">
				<a href={`/events/${event.slug}`} class="w-full">
					<img class="h-48 sm:h-96 " src={event.logo} alt="" />
				</a>
			</div>
		</div>
	</div>
</div>
