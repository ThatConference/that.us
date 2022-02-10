<script>
	import { Standard as StandardLink, Action as ActionLink } from '$elements/links';
</script>

<section class="relative overflow-x-hidden">
	<div class="my-36 md:my-12 mx-auto max-w-screen-xl px-4 sm:px-6">
		<div class="flex flex-col space-y-24 lg:grid lg:grid-cols-7">
			<div class="col-span-4">
				<h2 class="text-thatRed-500 uppercase tracking-wider font-extrabold">CAMP FOR GEEKS</h2>
				<h1 class="mt-6 text-thatBlue-700 text-5xl font-semibold">
					Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share
					and learn together.
				</h1>

				<p class="mt-6 text-gray-500 text-2xl">
					We geek-out in <a href="/tx/"
						><span class="text-thatRed-500 font-extrabold">Texas</span></a
					>
					and
					<a href="/wi/"><span class="text-thatRed-500 font-extrabold">Wisconsin</span></a> once a year
					but we host digital events all the time.
				</p>
				<div class="mt-20 flex space-x-4">
					<div><ActionLink href="/support/">What is THAT Community?</ActionLink></div>
					<div><StandardLink href="/events/">View all Events</StandardLink></div>
				</div>
			</div>
			<div class="col-span-3 flex flex-col items-center justify-center">
				<a
					class="transition duration-500 ease-in-out transform hover:scale-105"
					href="https://www.youtube.com/watch?v=_aO4uBrJGFU"
					target="_blank"
				>
					<img
						class="lazyload h-96 w-auto"
						src="/images/characters/Robot-Play.svg"
						alt="THAT Robot Play Button"
					/>
				</a>
			</div>
		</div>
	</div>
</section>
