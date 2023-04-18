<script>
	export let data;

	import { browser } from '$app/environment';
	import { scrollto } from 'svelte-scrollto';

	import Trees from '$elements/svgs/Trees.svelte';

	import Ticker from './ticker.svelte';

	let { partners } = data;
</script>

<div class="relative overflow-x-hidden text-gray-500">
	<div class="mx-auto mb-16 mt-36 max-w-screen-xl px-4 sm:px-0">
		<h2 class="my-6 font-extrabold uppercase tracking-wider text-thatRed-500 antialiased">
			Help Send a Geek To Camp
		</h2>
		<header class="item-center flex flex-col md:flex-row">
			<div class="md:w-1/2">
				<h1 class="text-5xl font-bold text-thatBlue-700 antialiased">
					<span>Become A</span><br />
					<span>Camp Sponsor</span>
				</h1>
			</div>
			<div class="mt-8 md:mt-0 md:w-3/4">
				<p class="prose-xl">
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
				<div class="flex">
					<div class="w-1/2">
						<div class="flex h-full flex-col justify-center space-y-6 text-white">
							<div class="text-2xl font-bold">Summer Camp For Geeks</div>
							<p class="prose-xl text-white">
								THAT Conference is the “Summer Camp for Geeks” that combines technology, networking,
								social events and exposure in an inspirational, family friendly environment at the
								The Kalahari Resort in Wisconsin Dells. Over four days, over a thousand folks of
								diverse technology backgrounds and expertise levels gather to take advantage of
								multiple learning mediums to maximize one’s community and career advancements.
							</p>

							<div class="flex flex-1">
								<!-- svelte-ignore a11y-missing-attribute -->
								<a use:scrollto={'#prospectus'}>
									<div
										class="transform rounded-lg border-2 border-thatBlue-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-105">
										<div class="flex space-x-4">
											<div class="flex flex-col text-white">
												<p class="font-bold">Sponsorship Prospectus</p>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div class="w-1/2">
						<img src="/images/characters/Sammy-Boating.svg" alt="boating in forest" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="my-36 flex flex-col items-center text-center">
		<p class="prose-xl max-w-xl text-gray-500">
			Whether your focus is on the professional or family side, we look for interactive partners who
			want to create a unique experience while having fun with our summer camp for geeks theme.
		</p>
	</div>

	<div class="my-36 flex flex-col items-center">
		<img class="w-1/3" src="/images/sponsorship-packages.png" alt="boating in forest" />
	</div>

	<div class="">
		<Ticker {partners} />
	</div>

	<div class="mx-auto my-36 flex max-w-screen-lg flex-col md:flex-row">
		<div class="flex flex-col items-center md:basis-1/2">
			<img class="h-96" src="/images/characters/skinny.svg" alt="boating in forest" />
		</div>
		<div class="space-y-6 md:basis-1/2">
			<h4 class="text-2xl font-extrabold uppercase">Enabling Meaningful Interactions</h4>
			<p class="prose text-gray-500">
				We believe that by partnering with our sponsors not only can we help enable your goals but
				it also creates a more engaging environment for our attendees. Engage with true
				practitioners, thought leaders and entrepreneurs while enjoying the perks of summer camp at
				a giant waterpark. Join us and become part of THAT family.
			</p>
		</div>
	</div>

	<div id="prospectus" class="bg-thatBlue-700 py-12">
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
							<img src="/images/characters/sasquatch.png" alt="boating in forest" />
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
