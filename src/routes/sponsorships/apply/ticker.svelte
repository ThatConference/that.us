<script>
	export let partners = [];

	let partnersDoubled = [...partners, ...partners];
	let cardWidth = 435;
</script>

<div class="py-36">
	<div style="--numberOfCards:{partnersDoubled.length}; --cardWidth:{cardWidth}px;">
		<div id="sponsorCarousel" class="flex space-x-12">
			{#each partnersDoubled as partner}
				<div class="sponsorCard flex-grow rounded-xl border bg-white shadow-2xl">
					<a href="/partners/{partner.slug}">
						<div class="flex h-full w-full flex-col">
							<div class="flex-grow">
								<div
									class="flex h-full w-96 transform items-center justify-center p-4 transition duration-500 ease-in-out hover:scale-125">
									<img src={partner.companyLogo} class="w-48" alt={partner.companyName} />
								</div>
							</div>

							<div class="sponsorCardFooter rounded-b-xl px-4 py-4">
								<div class="flex">
									<div class="text-xl font-extrabold uppercase text-white">
										{partner.level} Sponsor
									</div>
								</div>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-1 * var(--cardWidth) * var(--numberOfCards) / 2));
		}
	}

	#sponsorCarousel {
		animation: scroll 90s linear infinite;
	}

	.sponsorCard:nth-child(odd) {
		transform: rotate(2deg);
	}

	.sponsorCard:nth-child(even) {
		transform: rotate(-1deg);
	}

	.sponsorCard:nth-child(odd) .sponsorCardFooter {
		@apply bg-gradient-to-r from-cyan-500 to-blue-500;
	}
	.sponsorCard:nth-child(even) .sponsorCardFooter {
		@apply bg-gradient-to-r from-that-orange to-that-red;
	}

	.sponsorCard:hover {
		transform: rotate(0deg);
	}

	.sponsorCard {
		width: var(--cardWidth);
	}
</style>
