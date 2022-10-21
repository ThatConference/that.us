<script>
	import { page } from '$app/stores';

	const { event } = $page.params;
</script>

<div id="special-offers" class="relative mt-40">
	<div class="mx-auto max-w-2xl lg:max-w-7xl">
		<div>
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
								class="rounded-full bg-thatBlue-500 px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
								Room Blocks Discounts
							</span>
						</h3>

						<div class="prose mt-4 text-lg text-gray-500">
							Staying at the Kalahari Resort? We have a room block setup discounting every type of
							room. Head over to our travel information for more informaiton.
						</div>
					</div>

					<div
						class="flex w-48 flex-shrink-0 justify-center rounded-md bg-gray-100 shadow-md hover:bg-gray-200">
						<a
							href={`/support/travel/${event}/`}
							class="border-transparentpx-5 border py-3 text-base font-medium text-gray-900">
							Travel Information
						</a>
					</div>
				</div>

				<div
					class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
					<div>
						<h3>
							<span
								class="rounded-full bg-that-orange px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
								Volume Ticket Discounts
							</span>
						</h3>

						<div class="prose mt-4 text-lg text-gray-500">
							Ordering 10 or more tickets? Contact us at
							<a href="mailto:hello@that.us?subject=Ticket Discounts" rel="noopener" target="_blank"
								>hello@that.us</a>
							to ask about direct invoicing with volume discounts.
						</div>
					</div>

					<div
						class="flex w-48 flex-shrink-0 justify-center rounded-md bg-gray-100 shadow-md hover:bg-gray-200">
						<a
							href="mailto:hello@that.us"
							class=" border border-transparent px-5 py-3 text-base font-medium text-gray-900">
							Volume Discounts
						</a>
					</div>
				</div>

				<div
					class="flex flex-col items-center justify-start space-x-12 space-y-6 sm:flex-row sm:justify-between">
					<div>
						<h3>
							<span
								class="rounded-full bg-that-orange px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
								Student Discounts
							</span>
						</h3>

						<div class="prose mt-4 text-lg text-gray-500">
							Are you in College, or maybe even High School? Let us help, Contact us at
							<a href="mailto:hello@that.us?subject=Ticket Discounts" rel="noopener" target="_blank"
								>hello@that.us</a>
							to ask about our EDU discounts. You must present a valid EDU email address or current picture
							id.
						</div>
					</div>

					<div
						class="flex w-48 flex-shrink-0 justify-center rounded-md bg-gray-100 shadow-md hover:bg-gray-200">
						<a
							href="mailto:hello@that.us"
							class="border border-transparent px-5 py-3 text-base font-medium text-gray-900">
							Student Discounts
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
							We are committed to the health and safety of all in-person participants of the
							conference. We are constantly monitoring the CDC guidelines and working with the
							Kalahari Meeting and Convention team to accommodate healthy practices in the
							convention center.
						</div>
					</div>

					<div
						class="flex w-48 flex-shrink-0 justify-center rounded-md bg-gray-100 shadow-md hover:bg-gray-200">
						<a
							href="/support/covid-policies/"
							class="border border-transparent px-5 py-3 text-base font-medium text-gray-900 ">
							Learn More
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
