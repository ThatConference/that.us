<script>
	export let event;

	import { Action as ActionLink } from '$elements/links';
</script>

<div class="relative mx-auto mt-48 mb-24 max-w-screen-xl">
	<div class="flex grid-cols-2 flex-col gap-12 lg:grid">
		<div class="place-self-center p-4 lg:p-0">
			<div class="absolute left-1/4 -top-24 hidden lg:block xl:left-3/4">
				<img class="lazyload h-12 w-full" src="/images/characters/drone.svg" alt="" />
			</div>

			<div class="duration-500 ease-in-out hover:scale-105">
				<a href="https://www.youtube.com/watch?v=_aO4uBrJGFU" target="_blank">
					<img class="lazyload h-[674] w-full" src="/images/video-preview.jpg" alt="" />
				</a>
			</div>
			<div class="absolute hidden -rotate-6 lg:-bottom-10 lg:block xl:-left-20">
				<img class="lazyload h-64" src="/images/characters/red-bear.svg" alt="" />
			</div>
		</div>
		<div class="flex flex-col space-y-6 px-4 py-8">
			<div>
				<h1 class="font-extrabold uppercase tracking-wider text-thatRed-500">
					What Is THAT Conference?
				</h1>
			</div>
			<h2 class="text-4xl font-bold text-thatBlue-700 antialiased">
				A full-stack, tech-obsessed conference full of fun, code-loving humans who share and learn
				together.
			</h2>
			<p class="prose prose-xl text-gray-500">
				THAT Conference is unlike any other technical conference. This unique four-day summer camp
				is full of workshops, sessions, open spaces, family events, and networking, all nestled in
				the gorgeous Kalahari Resort and Waterpark. This family-friendly event is comprised of
				professional and family tracks, so there is something to learn and experience at all ages.
			</p>
			<div class="pt-8">
				<ActionLink href={`/events/${event.slug}/schedule/`}>View Schedule</ActionLink>
			</div>
		</div>
	</div>
</div>
