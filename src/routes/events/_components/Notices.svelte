<script>
	import { page } from '$app/stores';

	const { event } = $page.params;
</script>

<div id="discounts" class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
	<div class="bg-white px-12 py-6 flex flex-col justify-start rounded-lg shadow-lg space-y-12">
		<div
			class="flex flex-col sm:flex-row justify-start sm:justify-between items-center space-x-12 space-y-6"
		>
			<div>
				<h3>
					<span
						class="px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase bg-that-orange text-white"
					>
						Individual Ticket Discounts
					</span>
				</h3>

				<div class="mt-4 prose text-lg text-gray-500">
					<p>
						Company won't send you and you're paying for your own ticket? Let us help. Below is a
						set of discounts codes for campers who are paying for their own way.
					</p>

					<ul>
						<li>
							Use code <span class="font-extrabold">TX150</span> during checkout to recieve
							<span class="font-extrabold">$150</span> off the Everything Camper Ticket.
						</li>
						<li>
							Use code <span class="font-extrabold">TX100</span> during checkout to recieve
							<span class="font-extrabold">$100</span> off either the 3 Camper Ticket or 3 day Camper
							No Food Ticket.
						</li>
						<li>
							Use code <span class="font-extrabold">TX75</span> during checkout to recieve
							<span class="font-extrabold">$75</span> off the ON THAT Virtual Camper Ticket.
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col sm:flex-row justify-start sm:justify-between items-center space-x-12 space-y-6"
		>
			<div>
				<h3>
					<span
						class="px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase bg-that-orange text-white"
					>
						Bulk Ticket Discounts
					</span>
				</h3>

				<div class="mt-4 prose text-lg text-gray-500">
					Ordering 10 or more tickets? Contact us at
					<a href="mailto:hello@that.us?subject=Ticket Discounts" rel="noopener" target="_blank"
						>hello@that.us</a
					>
					to ask about direct invoicing with volume discounts.
				</div>
			</div>

			<div class="flex-shrink-0 w-48 flex justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href="mailto:hello@that.us"
					class="px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
				>
					Contact Us Today
				</a>
			</div>
		</div>

		<div
			class="flex flex-col sm:flex-row justify-start sm:justify-between items-center space-x-12 space-y-6"
		>
			<div>
				<h3>
					<span
						class="px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase bg-thatBlue-500 text-white"
					>
						Room Blocks Discounts
					</span>
				</h3>

				<div class="mt-4 prose text-lg text-gray-500">
					Staying at the Kalahari Resort? We have a room block setup discounting every type of room.
					Head over to our travel information for more informaiton.
				</div>
			</div>

			<div class="flex-shrink-0 w-48 flex justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href={`/support/travel/${event}/`}
					class="px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
				>
					Travel Information
				</a>
			</div>
		</div>

		<!-- Covid -->
		<div
			class="flex flex-col sm:flex-row justify-start sm:justify-between items-center space-x-12 space-y-6"
		>
			<div>
				<h3>
					<span
						class="px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase bg-yellow-300 text-gray-600"
					>
						Covid Policies
					</span>
				</h3>

				<div class="mt-4 prose text-lg text-gray-500">
					We are committed to the health and safety of all in-person participants of the conference.
					We are constantly monitoring the CDC guidelines and working with the Kalahari Meeting and
					Convention team to accommodate healthy practices in the convention center.
				</div>
			</div>

			<div class="flex-shrink-0 w-48 flex justify-center rounded-md shadow hover:bg-gray-50">
				<a
					href="/support/covid-policies/"
					class="px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>
</div>
