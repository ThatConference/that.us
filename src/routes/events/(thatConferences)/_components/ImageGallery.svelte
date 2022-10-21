<script>
	export let items = [];

	import RightArrow from '$elements/svgs/RightArrow.svelte';
	import LeftArrow from '$elements/svgs/LeftArrow.svelte';

	const gallerySize = 3;

	let key = 0;
	let displayItems = items.slice(0, gallerySize);

	function pick(current) {
		let newArray = [];

		for (let loop = 0; loop < gallerySize; loop++) {
			let index = (current + loop) % items.length;
			newArray.push(items[index]);
		}

		return newArray;
	}

	function forward() {
		if (key === items.length - 1) key = 0;
		else key = 1 + key;

		displayItems = pick(key);
	}

	function backward() {
		if (key === 0) key = items.length;
		else key = key - 1;

		displayItems = pick(key);
	}
</script>

<div id="gallery" class="relative my-24 overflow-hidden">
	<div class="grid grid-cols-5 gap-2 text-white">
		{#each displayItems as item, i}
			{#if i % 2 === 0}
				<div class="h-full w-full place-self-center py-6">
					<div class="h-full w-full duration-500 ease-in-out hover:scale-105">
						<a href={item.url} target="_blank" rel="external noreferrer">
							<img
								class="lazyload h-full w-full object-none object-center blur-sm "
								src={item.src}
								alt=""
								class:rounded-r-2xl={i === 0}
								class:rounded-l-2xl={i === 2} />
						</a>
					</div>
				</div>
			{:else}
				<div
					class="z-10 col-span-3 place-self-center py-6 duration-500 ease-in-out hover:scale-105">
					<a href={item.url} target="_blank" rel="external noreferrer">
						<img
							class="lazyload col-span-3 h-[770] w-full rounded-2xl object-cover shadow-xl"
							src={item.src}
							alt="" />
					</a>
				</div>
			{/if}
		{/each}
	</div>

	<div class="relative mx-auto max-w-7xl">
		<div class="-mt-16 flex flex-col items-center">
			<div class="z-20 flex space-x-12 text-white blur-none">
				<button
					on:click={backward}
					class="h-16 w-16 rounded-full bg-that-red duration-500 ease-in-out hover:scale-105">
					<div class="flex flex-col items-center">
						<LeftArrow />
					</div>
				</button>
				<button
					on:click={forward}
					class="h-16 w-16 rounded-full bg-that-red duration-500 ease-in-out hover:scale-105">
					<div class="flex flex-col items-center">
						<RightArrow />
					</div>
				</button>
			</div>
		</div>

		<div class="flex font-semibold text-gray-500">
			<span>Check out more fun conference photos</span>
			<a
				href="https://flickr.com/thatconference"
				target="_blank"
				rel="external noopener noreferrer">
				<span class="pl-1 font-extrabold text-thatRed-500">here</span>
			</a>
		</div>
	</div>
</div>
