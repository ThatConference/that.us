<script>
	export let event;
</script>

<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
	<div class="flex flex-col justify-center text-center">
		<h2 class="text-4xl font-extrabold tracking-tighter uppercase text-thatBlue-800">
			Perks If You're Selected To Speak At That Conference
		</h2>
	</div>

	<div class="mt-24 grid grid-cols-1 gap-8 gap-y-24 sm:grid-cols-3">
		<a href="/events/{event.slug}/">
			<div
				class="h-full p-8 bg-gray-50 rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105"
			>
				<div class="-mt-16 flex flex-col justify-center">
					<img src="/images/characters/conference_ticket.svg" class="h-48" alt="" />
				</div>

				<p class="py-4 text-center text-lg font-extrabold tracking-wide text-gray-600">
					Conference Ticket
				</p>

				<p class="prose text-center text-gray-500">
					To attend all 4 days of THAT Conference! Including all conference meals, THAT Pig Roast
					and all social/networking activities!
				</p>
			</div>
		</a>

		<a href="/support/travel/">
			<div
				class="h-full p-8 bg-gray-50 rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105"
			>
				<div class="-mt-16 flex flex-col justify-center">
					<img src="/images/characters/hotel_accomodations.svg" class="h-48" alt="" />
				</div>

				<p class="py-4 text-center text-lg font-extrabold tracking-wide text-gray-600">
					Hotel Accomodations
				</p>

				<p class="prose text-center text-gray-500">
					For each talk accepted we cover 2 standard room nights at the Kalahari, up to a 3 nights
					max per family.
				</p>
			</div>
		</a>

		<a href="https://store.thatconference.com" open>
			<div
				class="h-full p-8 bg-gray-50 rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105"
			>
				<div class="-mt-16 flex flex-col justify-center">
					<img
						src="/images/characters/bear-eyelashes.png"
						class="flip h-48 w-full object-scale-down"
						alt=""
					/>
				</div>

				<p class="py-4 text-center text-lg font-extrabold tracking-wide text-gray-600">Camp Swag</p>

				<p class="prose text-center text-gray-500">We got ya covered, literally.</p>
			</div>
		</a>
	</div>
</div>

<style>
	.flip {
		transform: scaleX(-1);
	}
</style>
