<script>
	import { page } from '$app/stores';

	const { event } = $page.params;
</script>

<div id="discounts" class="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
	<div class="flex flex-col justify-start space-y-12 rounded-lg bg-white px-12 py-6 shadow-lg">
		<div class="mt-6">
			<h2 class="text-2xl font-extrabold text-thatBlue-800 sm:text-3xl">
				Room Blocks, Discounts, and Notices
			</h2>
		</div>
		<div
			class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
			<div>
				<h3>
					<span
						class="rounded-full bg-that-orange px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
						Individual Ticket Discounts
					</span>
				</h3>

				<div class="prose mt-4 text-lg text-gray-500">
					<p>
						Company won't send you and you're paying for your own ticket? Let us help. Below is a
						set of discounts codes for campers who are paying for their own way.
					</p>

					<ul>
						<li>
							Use code <span class="font-extrabold uppercase">{`${event}150`}</span> during checkout
							to receive
							<span class="font-extrabold">$150</span> off the Everything Camper Ticket.
						</li>
						<li>
							Use code <span class="font-extrabold uppercase">{`${event}100`}</span> during checkout
							to receive
							<span class="font-extrabold">$100</span> off either the 3 Camper Ticket or 3 day Camper
							No Food Ticket.
						</li>
						<li>
							Use code <span class="font-extrabold uppercase">{`${event}75`}</span> during checkout
							to receive
							<span class="font-extrabold">$75</span> off the ON THAT Virtual Camper Ticket.
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
			<div>
				<h3>
					<span
						class="rounded-full bg-that-orange px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
						Bulk Ticket Discounts
					</span>
				</h3>

				<div class="prose mt-4 text-lg text-gray-500">
					Ordering 10 or more tickets? Contact us at
					<a href="mailto:hello@that.us?subject=Ticket Discounts" rel="noopener" target="_blank"
						>hello@that.us</a>
					to ask about direct invoicing with volume discounts.
				</div>
			</div>

			<div class="flex w-48 flex-shrink-0 justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href="mailto:hello@that.us"
					class="rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50">
					Contact Us Today
				</a>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
			<div>
				<h3>
					<span
						class="rounded-full bg-thatBlue-500 px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
						Room Blocks Discounts
					</span>
				</h3>

				<div class="prose mt-4 text-lg text-gray-500">
					Staying at the Kalahari Resort? We have a room block setup discounting every type of room.
					Head over to our travel information for more informaiton.
				</div>
			</div>

			<div class="flex w-48 flex-shrink-0 justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href={`/support/travel/${event}/`}
					class="rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50">
					Travel Information
				</a>
			</div>
		</div>

		<!-- Covid -->
		<div
			class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
			<div>
				<h3>
					<span
						class="rounded-full bg-yellow-300 px-4 py-1 text-sm font-bold uppercase tracking-wide text-gray-600">
						Covid Policies
					</span>
				</h3>

				<div class="prose mt-4 text-lg text-gray-500">
					We are committed to the health and safety of all in-person participants of the conference.
					We are constantly monitoring the CDC guidelines and working with the Kalahari Meeting and
					Convention team to accommodate healthy practices in the convention center.
				</div>
			</div>

			<div class="flex w-48 flex-shrink-0 justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href="/support/covid-policies/"
					class="rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50">
					Learn More
				</a>
			</div>
		</div>
	</div>
</div>
