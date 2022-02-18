<script>
	import { Standard as StandardLink } from '$elements/links';
</script>

<section>
	<h2
		class="text-4xl font-extrabold leading-10 tracking-tight text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
	>
		Thank You for your support
	</h2>

	<div class="mt-3 sm:mx-auto sm:mt-5 md:mt-5 lg:mx-0">
		<div>
			<p
				class="text-base text-gray-500  
                  sm:max-w-7xl sm:text-lg
                  md:text-xl"
			>
				Since the start of THAT, it has been the continuous support from companies and organizations
				partnering with us to help create events that bring the community together. We thank every
				one of our partners and sponsors, across all levels, for their amazing and continued
				support! Please take a few minutes to learn about our partners and let them know you
				appreciate their support! Are you interested in partnering with us? Email us at
				<a
					href="mailto:hello@that.us?subject=Let's Partner"
					rel="noopener"
					target="_blank"
					class="text-thatOrange-400 hover:text-thatOrange-500 hover:underline">hello@that.us</a
				>.
			</p>
		</div>
		<div class="mt-5 flex sm:justify-end">
			<StandardLink href={`/partners/past`}>
				<span class="text-xl"> View Past Partners and Sponsors </span>
			</StandardLink>
		</div>
	</div>
</section>
