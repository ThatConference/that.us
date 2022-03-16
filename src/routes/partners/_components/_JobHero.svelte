<script>
	export let partner;

	import { Standard as StandardLink } from '$elements/links';
	import { SocialLink } from '$components/social';
</script>

<section class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="mb-24">
		<div class="flex flex-col space-y-8">
			<h1 class="text-base font-semibold uppercase leading-6 tracking-wide text-thatOrange-400">
				Career Opportunities at {partner.companyName}
			</h1>
			<div class="flex justify-between">
				<div>
					<div class="transform cursor-pointer transition duration-500 ease-in-out hover:scale-105">
						<a href="{partner.website}?utm_source=THAT">
							<img class="lazyload w-96" src={partner.companyLogo} alt={partner.companyName} />
						</a>
					</div>

					<div class="flex flex-col py-8 font-bold text-gray-500">
						{#if partner.city && partner.state}
							<h3 class="tracking-tight">{partner.city}, {partner.state}</h3>
						{/if}

						<div class="flex space-x-2 pt-4">
							{#each partner.socialLinks as link}
								<SocialLink {...link} />
							{/each}
						</div>
					</div>
				</div>

				<div class="flex flex-col space-y-8">
					<div class="flex justify-end space-x-4">
						<StandardLink class="h-3/4" href="{partner.website}?utm_source=THAT" open={true}>
							Visit Us
						</StandardLink>

						<!-- <StandardButton class="h-3/4">Connect with Us</StandardButton> -->
						{#if partner?.jobListing?.applyNowLink}
							<StandardLink
								class="h-3/4"
								href="{partner?.jobListing?.applyNowLink}?utm_source=THAT"
								open={true}>
								Apply Now
							</StandardLink>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
