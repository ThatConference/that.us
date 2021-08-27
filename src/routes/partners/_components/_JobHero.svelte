<script>
	export let partner;

	import { Standard as StandardLink } from '$/elements/links';
	import { SocialLink } from '$/components/social';
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="mb-24">
		<div class="flex flex-col space-y-8">
			<h1 class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide uppercase">
				Career Opportunities at {partner.companyName}
			</h1>
			<div class="flex justify-between">
				<div>
					<div class="transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
						<a href="{partner.website}?utm_source=THAT">
							<img
								class="w-96"
								src={partner.companyLogo}
								alt={partner.companyName}
								loading="lazy"
							/>
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
								open={true}
							>
								Apply Now
							</StandardLink>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
