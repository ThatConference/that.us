<script>
	export let event;
</script>

<div class="relative px-4">
	<div class="mx-auto w-full max-w-7xl">
		<div class="flex flex-col items-center justify-center sm:flex-row sm:justify-around">
			<div class="flex max-w-3xl flex-col space-y-4">
				<h1 class="text-3xl font-extrabold uppercase text-thatBlue-500 sm:text-5xl">
					{event.name} <br />
					Partners and Sponsors
				</h1>

				<div class="font-extrabold">
					<p class="text-xl tracking-tight text-gray-500 sm:text-3xl">
						Thank you helping make THAT possible.
					</p>
				</div>

				<p class="text-xl tracking-tight text-gray-500 sm:text-3xl">
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
