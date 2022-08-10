<script>
	export let id;
	export let title;
	export let shortDescription;
	export let speakers;
	export let type;
	export let location;

	import Icon from 'svelte-awesome';
	import { youtubePlay, signIn } from '$components/svelte-awesome-icons';

	import KeynoteSpeaker from './KeynoteSpeaker.svelte';
	import PanelSpeakers from './PanelSpeakers.svelte';

	let splitTitle = title.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|');
</script>

<div>
	<a href={`/activities/${id}`}>
		<div class="rounded bg-thatBlue-800">
			<div class="relative z-10 rounded-lg shadow-xl">
				<div class="absolute inset-x-0 top-0 translate-y-px transform">
					<div class="flex -translate-y-1/2 transform justify-center">
						<span
							class="inline-flex rounded-full bg-red-500 px-20 py-3 text-2xl
            font-semibold uppercase leading-5 tracking-wider text-white">
							Keynote
						</span>
					</div>
				</div>
			</div>

			<div class="px-4 pt-12 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
				<div class="text-center">
					<p
						class="mt- text-3xl font-extrabold leading-9 text-white sm:text-2xl
          sm:leading-10 lg:text-5xl lg:leading-none">
						{#each splitTitle as line}
							<p>{line}</p>
						{/each}
					</p>
					<p
						class="lineBreaks mx-auto mt-12 max-w-4xl text-xl leading-7 text-gray-300
          sm:mt-14 sm:text-2xl sm:leading-8">
						{shortDescription}
					</p>
				</div>

				<div class="pt-8">
					{#if type === 'KEYNOTE'}
						<KeynoteSpeaker {speakers} />
					{:else if type === 'PANEL'}
						<PanelSpeakers {speakers} />
					{/if}

					<div class="rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-10 py-10 pt-10 pb-8">
						<div class="flex flex-col items-center justify-center lg:flex-row">
							<span
								class="flex-none pb-4 text-3xl leading-none tracking-tight text-gray-900 sm:text-3xl lg:pr-4 lg:pb-0">
								<span class="font-extrabold">
									{#if location === 'THAT'}
										Join In
									{:else}
										Watch On
									{/if}
								</span>
							</span>

							<div class="flex flex-col items-center justify-center lg:flex-row">
								{#if location === 'THAT'}
									<div class="m-3 inline-flex rounded-md shadow-md">
										<a
											href={`/join/${id}`}
											class="focus:ring-red relative inline-flex w-32
                      items-center justify-center rounded-md border border-gray-300 bg-white
                      px-4 py-2 text-sm font-medium
                      leading-5 text-gray-700
                      hover:text-red-700 focus:border-red-300
                      focus:outline-none active:bg-gray-50 active:text-gray-800">
											<Icon data={signIn} class="-ml-1 mr-2 h-5 w-5" />
											<span>THAT</span>
										</a>
									</div>
								{:else}
									<div class="m-3 inline-flex rounded-md shadow-md">
										<a
											href="https://youtube.com/c/thatconference"
											class="focus:ring-red relative inline-flex w-32
                      items-center justify-center rounded-md border border-gray-300 bg-white
                      px-4 py-2 text-sm font-medium
                      leading-5 text-gray-700
                      hover:text-red-700 focus:border-red-300
                      focus:outline-none active:bg-gray-50 active:text-gray-800">
											<Icon data={youtubePlay} class="-ml-1 mr-2 h-5 w-5" />
											<span>YouTube</span>
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div></a>
</div>
