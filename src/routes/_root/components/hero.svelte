<script>
	import { Standard as StandardLink, Action as ActionLink } from '$elements/links';
</script>

<section class="relative overflow-x-hidden">
	<div class="my-36 mx-auto max-w-screen-xl px-4 sm:px-6 md:my-12">
		<div class="flex flex-col space-y-24 lg:grid lg:grid-cols-7">
			<div class="col-span-4">
				<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500 antialiased">
					CAMP FOR GEEKS
				</h2>
				<h1 class="mt-6 text-5xl font-bold text-thatBlue-700 antialiased">
					Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share
					and learn together.
				</h1>

				<p class="mt-6 text-2xl text-gray-500">
					We geek-out in
					<a href="/tx/">
						<span class="font-extrabold text-thatRed-500">Texas</span>
					</a>
					and
					<a href="/wi/">
						<span class="font-extrabold text-thatRed-500">Wisconsin</span>
					</a>
					once a year but we host digital events all the time.
				</p>
				<div
					class="mt-20 flex flex-col items-center justify-center space-y-12 sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4">
					<div>
						<ActionLink href="/support/">What is THAT Community?</ActionLink>
					</div>
					<div><StandardLink href="/events/">View all Events</StandardLink></div>
				</div>
			</div>
			<div class="col-span-3 flex flex-col items-center justify-center">
				<a
					class="transform transition duration-500 ease-in-out hover:scale-105"
					href="https://www.youtube.com/watch?v=_aO4uBrJGFU"
					target="_blank"
					rel="external noopener noreferrer">
					<img
						class="lazyload h-96 w-auto"
						src="/images/characters/Robot-Play.svg"
						alt="THAT Robot Play Button" />
				</a>
			</div>
		</div>
	</div>
</section>
