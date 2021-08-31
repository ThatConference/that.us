<script>
	import CfpCta from '../cta/_HomePageCFP.svelte';
	import TicketsOnSale from '../cta/_TicketsOnSale.svelte';

	import { getAuth } from '$utils/security';
	const { isAuthenticated } = getAuth();
</script>

<section class="relative overflow-x-hidden">
	<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
		<main class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
			<h2
				class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight
          leading-10 font-extrabold text-thatBlue-800 sm:text-5xl
          sm:leading-none md:text-6xl"
			>
				Where
				<span class="text-thatOrange-400">Geeks</span>
				Connect Every Day
			</h2>

			<div class="lg:grid lg:grid-cols-12 lg:gap-8">
				<div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-5 lg:text-left">
					<div class="prose sm:text-lg md:text-xl text-gray-500">
						<p>
							It's our mission to make the best community of geeks on this planet. A community of
							people who want to help one another each and every day.
						</p>

						<p>
							Our jobs are complex, our industry moves fast, but we’re also privileged to be able to
							work with people all over the globe, yet we’ve been missing something.
						</p>
					</div>
				</div>

				<div
					class="sm:text-center md:max-w-2xl md:mx-auto lg:col-start-7
            lg:col-span-6 lg:text-left"
				>
					<!-- action buttons -->
					<div
						class="mt-5 sm:mt-8 sm:flex flex-col space-y-4 items-center
              sm:justify-center lg:justify-start"
					>
						<p
							class="mt-3 font-extrabold text-thatBlue-800 sm:mt-5 sm:text-lg
                sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
						>
							All you need is an internet connection and a web browser.
						</p>

						<div class="flex space-x-4">
							{#if !$isAuthenticated}
								<a
									href="/support/welcome"
									class="px-8 py-3 rounded-md shadow text-base leading-6
                  font-medium border-2 border-thatBlue-500 text-thatBlue-500
                  bg-white hover:bg-thatBlue-500 hover:text-white
                  focus:bg-thatBlue-500 focus:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:border-thatBlue-800
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
								>
									Getting Started
								</a>

								<a
									href="/signup"
									class="px-8 py-3 border-2 border-transparent text-base
                    leading-6 font-medium rounded-md shadow text-white
                    bg-thatOrange-400 hover:bg-thatOrange-500 focus:outline-none
                    focus:border-thatOrange-700 focus:ring-that-orange
                    transition duration-150 ease-in-out md:py-4 md:text-lg
                    md:px-10"
								>
									Join today!
								</a>
							{:else}
								<a
									href="/events"
									class="px-8 py-3 rounded-md shadow text-base leading-6
                    font-medium border-2 border-thatBlue-500 text-thatBlue-500
                    bg-white hover:bg-thatBlue-500 hover:text-white
                    focus:bg-thatBlue-500 focus:text-white focus:outline-none
                    focus:ring-thatBlue-500 focus:border-thatBlue-800
                    transition duration-150 ease-in-out md:py-4 md:text-lg
                    md:px-10"
								>
									Upcoming Events
								</a>

								<a
									href="/activities"
									class="px-8 py-3 rounded-md shadow text-base leading-6
                    font-medium border-2 border-thatBlue-500 text-thatBlue-500
                    bg-white hover:bg-thatBlue-500 hover:text-white
                    focus:bg-thatBlue-500 focus:text-white focus:outline-none
                    focus:ring-thatBlue-500 focus:border-thatBlue-800
                    transition duration-150 ease-in-out md:py-4 md:text-lg
                    md:px-10"
								>
									Upcoming Activities
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<div class="pt-24">
				<div class="lg:grid lg:grid-cols-12 lg:gap-24 lg:place-items-center">
					<div
						class="flex flex-col items-center justify-center md:max-w-2xl md:mx-auto lg:col-span-5"
					>
						<CfpCta />
						<!-- <TicketsOnSale /> -->
					</div>

					<div
						class="mt-12 sm-mt-0 sm:text-center md:max-w-2xl md:mx-auto lg:col-start-6 lg:col-span-7 lg:text-left"
					>
						<div class="flex flex-col space-y-6">
							<h2
								class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight
                  leading-10 font-extrabold text-thatBlue-800 sm:text-5xl
                  sm:leading-none md:text-6xl"
							>
								Online or In-Person
							</h2>
							<div class="prose sm:text-lg md:text-xl text-gray-500">
								<p>
									Nothing will ever replace having a face-to-face conversation where people can
									deeply engage and explore a topic. A safe place where questions can be asked
									without judgment or bias. Conferences and user groups traditionally help fill that
									gap but leave a huge void for the rest of the year.
								</p>

								<p>
									This is where THAT comes in. It’s our mission to connect you and give you a safe
									place to have a conversation each and every day. Let’s say you want to have a code
									review or a design review, great. Maybe you want to share your experience with the
									latest JavaScript framework or seek some geek parenting advice. There are no
									limits, there are no artificial boundaries. Just people helping people be awesome.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</section>
