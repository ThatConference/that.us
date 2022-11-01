<script>
	import { browser } from '$app/environment';
	import Trees from '$elements/svgs/Trees.svelte';
</script>

<div class="relative overflow-x-hidden text-gray-500">
	<div class="my-36 mx-auto max-w-screen-xl px-4 sm:px-0 md:my-16">
		<header class="flex">
			<div class="w-1/2">
				<h1 class="text-7xl font-bold text-thatBlue-700 antialiased">
					<span>Become A</span><br />
					<span>Camp Sponsor</span>
				</h1>
			</div>
			<div class="w-1/2">
				<p class="text-xl">
					We believe that by partnering with our sponsors not only can we help enable your goals but
					it also creates a more engaging environment for our attendees. Engage with true
					practitioners, thought leaders and entrepreneurs while enjoying the perks of summer camp
					at a giant waterpark. Join us and become part of THAT family.
				</p>
			</div>
		</header>
	</div>

	<div>
		<div class="flex translate-y-16 flex-col items-center">
			<Trees classes="h-32 w-32 text-thatRed-500" />
		</div>

		<div class="bg-thatBlue-700 py-12">
			<div class="mx-auto max-w-screen-lg px-4 sm:px-6">
				<div class="flex ">
					<div class="w-1/2">
						<div class="flex h-full flex-col justify-center space-y-4 text-white">
							<div class="text-2xl font-bold">Summer Camp For Geeks</div>
							<p class="prose text-white">
								THAT Conference is the “Summer Camp for Geeks” that combines technology, networking,
								social events and exposure in an inspirational, family friendly environment at the
								The Kalahari Resort in Wisconsin Dells. Over four days, over a thousand folks of
								diverse technology backgrounds and expertise levels gather to take advantage of
								multiple learning mediums to maximize one’s community and career advancements.
							</p>
							<div>button</div>
						</div>
					</div>
					<div class="w-1/2">
						<img src="/images/characters/Sammy-Boating.svg" alt="boating in forest" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="my-24 flex flex-col items-center text-center">
		<p class="prose max-w-xl text-gray-500">
			Whether your focus is on the professional or family side, we look for interactive partners who
			want to create a unique experience while having fun with our summer camp for geeks theme.
		</p>
	</div>

	<div class="bg-thatBlue-700 py-12">
		<div class="mx-auto max-w-screen-lg px-4 sm:px-6">
			<div class="flex">
				<div class="mr-12 w-1/2">
					<div class="flex h-full flex-col justify-center space-y-4 text-white">
						<div class="text-2xl font-bold uppercase">Get The Prospectus</div>
						<p class="prose text-white">
							The opportunities are endless when it comes to your partnership goals. Let’s partner
							and make those goals a reality. Provide your contact information so we can send you
							our prospectus and start to review our wide range of sponsorship opportunities and a
							la carte options. We look forward to partnering with you at THAT Conference!
						</p>

						<div class="p-12 ">
							<img src="/images/characters/Sammy-Boating.svg" alt="boating in forest" />
						</div>
					</div>
				</div>

				<div class="flex w-1/2 flex-col space-y-6 text-white">
					<div>
						<h4 class="font-bold uppercase">We need a little info first</h4>
					</div>
					<div>
						{#if browser}
							<script>
								hbspt.forms.create({
									region: 'na1',
									portalId: '22769624',
									formId: '067aa38e-1b54-416a-8255-31ace0af9c27'
								});
							</script>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
