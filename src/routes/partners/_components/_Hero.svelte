<script>
	export let partner;
	export let isFollowing = false;
	export let wasContactExchanged = false;

	import { createEventDispatcher } from 'svelte';

	import { isAuthenticated } from '$utils/security';
	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';
	import { SocialLink } from '$components/social';

	const dispatch = createEventDispatcher();
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="mb-24">
		<div class="flex flex-col space-y-8">
			<h1 class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide uppercase">
				PARTNER SPOTLIGHT
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
							Visit
						</StandardLink>

						{#if $isAuthenticated}
							<!-- TODO.. Needs a bit of work.
                <StandardButton
                  class="h-3/4"
                  on:click="{() => dispatch('XCHANGE_CONTACT')}">
                  {#if !wasContactExchanged}
                    Exhange Contact Information
                  {:else}
                    Contact Exchang ed
                  {/if}
                </StandardButton> -->

							<StandardButton class="h-3/4" on:click={() => dispatch('TOGGLE_FOLLOW')}>
								{#if !isFollowing}Follow{:else}Un-Follow{/if}
							</StandardButton>
						{/if}
					</div>
				</div>
			</div>

			<div class="leading-8 text-gray-800">
				<p class="prose-xl lineBreaks">{partner.aboutUs || ''}</p>
			</div>
		</div>
	</div>
</section>
