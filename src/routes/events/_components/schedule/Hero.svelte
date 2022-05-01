<script>
	export let event;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { scrollto } from 'svelte-scrollto';

	import Hero from '$elements/layouts/Hero.svelte';

	dayjs.extend(advancedFormat);

	const venue = event.venues[0];
</script>

<Hero imagePath="/images/heros/speaker.jpg">
	<div>
		<div class="flex max-w-3xl flex-col space-y-8">
			<h2 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
				<span class="text-green-500">{`${venue.city}, ${venue.state}`}</span> / {dayjs(
					event.startDate
				).format('MMMM Do')} - {dayjs(event.endDate).format('Do, YYYY')}
			</h2>
			<h1
				class="text-4xl font-extrabold uppercase text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
				THAT Conference <br />
				Schedule
			</h1>
		</div>

		<div
			class="mt-24 flex flex-col justify-center space-y-4 p-8 lg:flex-row lg:space-y-0 lg:space-x-4">
			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#monday'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 py-6 px-12 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Monday
						</p>
					</div>
				</a>
			</div>
			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#tuesday'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 py-6 px-12 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Tuesday
						</p>
					</div>
				</a>
			</div>
			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#wednesday'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 py-6 px-12 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Wednesday
						</p>
					</div>
				</a>
			</div>
			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#thursday'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 py-6 px-12 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Thursday
						</p>
					</div>
				</a>
			</div>
		</div>

		<div class="p-10 pb-24 text-center text-green-500">
			<p class="font-semibold tracking-wider">Times are represented in your browswer's timezone.</p>
			<p class="font-semibold tracking-wider">THAT Conference is in Central Time.</p>
		</div>
	</div>
</Hero>
