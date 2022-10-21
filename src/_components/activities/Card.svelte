<script>
	export let editMode = false;
	export let id;
	export let title;
	export let type;
	export let shortDescription;
	export let startTime;
	export let durationInMinutes;
	export let speakers;
	export let tags = [];
	export let eventId;
	export let targetLocation;
	export let location;
	export let dense = false;

	// 3rd party
	import { onMount, getContext } from 'svelte';
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import Icon from 'svelte-awesome';
	import {
		info,
		heart,
		heartO,
		signIn,
		cog,
		mapMarker,
		caretDown,
		user
	} from '$components/svelte-awesome-icons';
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import config from '$utils/config.public';
	import buildImageSrc from '$utils/image';
	import { truncate, isLongerThan } from '$utils/truncate';
	import { show } from '$stores/profileNotification';

	import { Tag } from '$elements';
	import CardLink from './CardLink.svelte';
	import favorites, { toggle } from '$lib/stores/favorites';

	dayjs.extend(isBetween);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(relativeTime);

	const { isEmpty, find } = lodash;
	const { sessionLocationDestinations } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');

	let host = speakers[0];
	let favoriteDisabled = false;

	const requiresAccessToJoin = eventId !== config.eventId;
	const isAllowed = () => {
		let permitted = false;

		if (isEmpty($page.data.user.profile)) {
			show.set(new Boolean(true));
			permitted = false;
		} else {
			permitted = true;
		}

		return permitted;
	};

	let expandDescription = false;
	let timeLeftToJoin = 'in ...';
	let hasExpired = true;
	let isInWindow = false;

	$: isFavorite = find($favorites, (i) => i.id === id) ? true : false;
	$: canJoin = isInWindow;

	onMount(async () => {
		let endTime = (durationInMinutes ? durationInMinutes : 60) + 10;
		let currentStartTime = dayjs(startTime).subtract(5, 'minute');
		let currentEndTime = dayjs(startTime).add(endTime, 'minute');

		const interval = setInterval(() => {
			let inSession = dayjs().isBetween(currentStartTime, currentEndTime);

			isInWindow = inSession;
			timeLeftToJoin = dayjs().to(currentStartTime);
			hasExpired = dayjs().isAfter(currentEndTime);

			if (!inSession) {
				const join = $page.url.searchParams.get('join');
				if (join) isInWindow = true;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	async function handleToggle() {
		if (isAllowed()) {
			favoriteDisabled = true;

			await toggle(id, eventId);

			favoriteDisabled = false;
		}
	}

	function canEdit() {
		let canEditMe = false;

		if (editMode) {
			if (dayjs(startTime).isSameOrAfter(dayjs(), 'day')) canEditMe = true;
		}

		return canEditMe;
	}

	function lookupEnumLabel(location) {
		return sessionLocationDestinations?.options.find((x) => x.value === location)?.label;
	}

	function getSessionUrl() {
		let sessionUrl = `/join/${id}`;

		if (targetLocation === 'OTHER') {
			if (location?.url) sessionUrl = location?.url;
		}

		return sessionUrl;
	}

	const userProfileImage = host.profileImage || config.defaultProfileImage;
	const srcset = buildImageSrc(userProfileImage, ['96']);
	const joinUrl = getSessionUrl();
</script>

{#if dense}
	<div
		class="mb-2 flex h-full w-full flex-col"
		class:rounded-lg={requiresAccessToJoin}
		class:border-t-4={requiresAccessToJoin}
		class:border-red-500={requiresAccessToJoin}>
		<div class="flex">
			<div
				class="flex flex-shrink-0 flex-grow-0 basis-32 flex-col items-stretch justify-between pt-3 text-center">
				<div class="flex flex-shrink-0 flex-grow flex-col justify-center">
					<div class="flex-start flex flex-shrink-0 flex-grow-0 flex-col">
						<a open href="/members/{host.profileSlug}/" class="flex-shrink-0">
							<span class="relative inline-block">
								<img
									class="lazyload h-12 w-12 rounded-full"
									alt={`${host.firstName} ${host.lastName}`}
									data-sizes="auto"
									data-src={srcset.src}
									data-srcset={srcset.srcset} />
							</span>
						</a>
						<h3 class="pt-1 text-center text-sm leading-5 text-gray-400 md:pb-2">
							{`${host.firstName} ${host.lastName}`}
						</h3>
					</div>
				</div>

				<div class="w-100 visible flex flex-row justify-between px-5 md:hidden">
					<div class="text-center">
						<CardLink href="/activities/{id}/" icon={info} text="" />
					</div>

					{#if !hasExpired}
						{#if $page.data.user.isAuthenticated}
							<button
								type="button"
								on:click|preventDefault={!favoriteDisabled && handleToggle}
								class="focus:ring-blue relative inline-flex items-center
									justify-center rounded-br-lg border border-transparent py-2 text-xs
									font-medium leading-4 text-gray-700
									transition duration-150
									ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
									focus:outline-none">
								{#if isFavorite}
									<Icon data={heart} class="h-4 w-4 text-red-500" />
								{:else}
									<Icon data={heartO} class="h-4 w-4" />
								{/if}
							</button>
						{:else}
							<a
								href="/login/"
								class="focus:ring-blue relative inline-flex items-center
									justify-center rounded-br-lg border border-transparent py-2 text-xs
									font-medium leading-4 text-gray-700
									transition duration-150
									ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
									focus:outline-none">
								<Icon data={heart} class="h-4 w-4" />
							</a>
						{/if}
					{/if}
				</div>
			</div>

			<div class="flex flex-grow flex-col justify-between">
				<!-- COLUMN 2-->
				<a href="/activities/{id}/">
					<h3 class="break-words pt-1 text-base font-medium leading-5 text-gray-900">
						{title}
					</h3>
				</a>

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="flex-grow pb-1"
					class:cursor-pointer={isLongerThan(shortDescription, 25)}
					on:click|preventDefault={() => (expandDescription = !expandDescription)}>
					<p class="break-words text-sm leading-5 text-gray-500">
						{#if expandDescription}
							<span class="lineBreaks">{shortDescription}</span>
						{:else}
							<div class:hover:text-gray-300={isLongerThan(shortDescription, 25)}>
								<span>{truncate(shortDescription, 25)}</span>
								{#if isLongerThan(shortDescription, 25)}
									<Icon data={caretDown} class="ml-2" />
								{/if}
							</div>
						{/if}
					</p>
				</div>

				<div class="border-t border-gray-200">
					<div class="-mt-px grid grid-cols-2 md:grid-cols-4">
						<div class="hidden border-l pl-1 text-center md:block">
							<CardLink href="/activities/{id}/" icon={info} text={'More Details'} />
						</div>

						{#if !hasExpired}
							<div class="hidden border-l pl-1 text-center md:block">
								{#if $page.data.user.isAuthenticated}
									<button
										type="button"
										on:click|preventDefault={!favoriteDisabled && handleToggle}
										class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
											justify-center rounded-br-lg border border-transparent py-2 text-xs
											font-medium leading-4 text-gray-700
											transition duration-150
											ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
											focus:outline-none">
										{#if isFavorite}
											<div class="text-red-500">
												<Icon data={heart} class="h-4 w-4" />
												<span class="ml-3">Unfavorite</span>
											</div>
										{:else}
											<div class="">
												<Icon data={heartO} class="h-4 w-4" />
												<span class="ml-3">Favorite</span>
											</div>
										{/if}
									</button>
								{:else}
									<a
										href="/login/"
										class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
										justify-center rounded-br-lg border border-transparent py-2 text-xs
										font-medium leading-4 text-gray-700
										transition duration-150
										ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
										focus:outline-none">
										<div>
											<Icon data={heart} class="h-4 w-4" />
											<span class="ml-3">Favorite</span>
										</div>
									</a>
								{/if}
							</div>
						{/if}

						{#if $page.data.user.isAuthenticated}
							{#if canEdit()}
								<div class="border-l pl-1 text-center">
									<a
										href="/activities/edit/{id}/"
										class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
											justify-center rounded-br-lg border border-transparent py-2 text-xs
											font-medium leading-4 text-gray-700
											transition duration-150
											ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
											focus:outline-none">
										<Icon data={cog} class="h-4 w-4" />
										<span class="ml-3">Edit</span>
									</a>
								</div>
							{/if}
						{/if}

						{#if !hasExpired}
							<div class="col-span-2">
								<div class="flex h-full">
									{#if targetLocation === 'IN_PERSON'}
										<div
											class="flex w-full justify-center space-x-8 rounded-br-lg  bg-that-blue py-2 text-xs font-medium  text-white">
											<div class="flex justify-center space-x-2">
												<Icon data={user} class="h-4 w-4" />
												<span>In-Person</span>
											</div>

											<div class="flex justify-center space-x-2">
												<Icon data={mapMarker} class="h-4 w-4" />
												<span>{lookupEnumLabel(location?.destination)}</span>
											</div>
										</div>
									{:else if canJoin}
										<div class="-ml-px flex flex-1 basis-0 border-l pl-1 text-center">
											<CardLink href={joinUrl} icon={signIn} text={'Join In'} />
										</div>
									{:else}
										<div class="-ml-px flex flex-1 border-l pl-1 text-center">
											<div
												class="relative inline-flex flex-1 items-center justify-center
													rounded-br-lg rounded-bl-lg border border-transparent py-2 text-xs
													font-medium leading-4 text-gray-300 transition duration-150
													ease-in-out">
												<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4" />
												<span>Join {timeLeftToJoin}</span>
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<!-- END COLUMN 2 -->
		</div>
		<!-- END GRID-->
	</div>
{:else}
	<div
		class={`flex h-full w-full flex-col ${
			requiresAccessToJoin ? 'rounded-lg border-t-4 border-red-500' : ''
		}`}>
		{#if type !== 'OPEN_SPACE' && host.profileSlug != 'thatconference'}
			<div class="relative w-full text-center">
				<div
					class="absolute top-8 right-0 inline-block rounded-l-xl bg-that-red p-2 pl-3 shadow-sm">
					<div class="flex flex-col items-center">
						<span class="text-xs uppercase text-white">Camp</span>
						<span class="text-xs uppercase text-white">Counselor</span>
					</div>
				</div>
			</div>
		{/if}
		<div class="flex w-full flex-col items-center p-3">
			<a href="/members/{host.profileSlug}/" class="flex-shrink-0">
				<span class="relative inline-block">
					<img
						class="lazyload h-24 w-24 rounded-full"
						alt={`${host.firstName} ${host.lastName}`}
						data-sizes="auto"
						data-src={srcset.src}
						data-srcset={srcset.srcset} />

					{#if host.earnedMeritBadges.length > 0}
						<span class="w-`8 absolute bottom-0 left-0 block h-8">
							<img
								class="lazyload"
								src={host.earnedMeritBadges[0].image}
								alt={host.earnedMeritBadges[0].name} />
						</span>
					{/if}
				</span>
			</a>

			<div class="flex w-full flex-col justify-center text-center">
				<a href="/activities/{id}/">
					<h3 class="break-words pt-1 text-base font-medium leading-5 text-gray-900">
						{title}
					</h3>
					<h3 class="pt-1 text-sm leading-5 text-gray-400">
						{`${host.firstName} ${host.lastName}`}
					</h3>
				</a>
			</div>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex-grow px-3 pb-3"
			class:cursor-pointer={isLongerThan(shortDescription, 25)}
			on:click|preventDefault={() => (expandDescription = !expandDescription)}>
			<p class="break-words text-sm leading-5 text-gray-500">
				{#if expandDescription}
					<span class="lineBreaks">{shortDescription}</span>
				{:else}
					<div class:hover:text-gray-300={isLongerThan(shortDescription, 25)}>
						<span>{truncate(shortDescription, 25)}</span>
						{#if isLongerThan(shortDescription, 25)}
							<Icon data={caretDown} class="ml-2" />
						{/if}
					</div>
				{/if}
			</p>
		</div>

		<div class="flex flex-wrap justify-center space-x-2 px-4 pb-3">
			{#each tags as t}
				<div class="py-2">
					<Tag>{t}</Tag>
				</div>
			{/each}
		</div>

		<div class="flex border-t border-gray-200">
			<div class="flex flex-1">
				<CardLink href="/activities/{id}/" icon={info} text="More Details" />
			</div>

			{#if !hasExpired}
				{#if $page.data.user.isAuthenticated}
					<div class="-ml-px flex flex-1 basis-0 border-t border-l border-gray-200">
						<button
							type="button"
							on:click|preventDefault={!favoriteDisabled && handleToggle}
							class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
                justify-center rounded-br-lg border border-transparent py-2 text-xs
                font-medium leading-4 text-gray-700
                transition duration-150
                ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
                focus:outline-none">
							{#if isFavorite}
								<div class="text-red-500">
									<Icon data={heart} class="h-4 w-4" />
									<span class="ml-3">Unfavorite</span>
								</div>
							{:else}
								<div>
									<Icon data={heartO} class="h-4 w-4" />
									<span class="ml-3">Favorite</span>
								</div>
							{/if}
						</button>
					</div>
				{:else}
					<div class="-ml-px flex flex-1 border-l border-t border-gray-200">
						<a
							rel="external"
							href="/login/"
							class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
                justify-center rounded-br-lg border border-transparent py-2 text-xs
                font-medium leading-4 text-gray-700
                transition duration-150
                ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
                focus:outline-none">
							<Icon data={heart} class="h-4 w-4" />
							<span class="ml-3">Favorite</span>
						</a>
					</div>
				{/if}
			{/if}

			{#if $page.data.user.isAuthenticated}
				{#if canEdit()}
					<div class="-ml-px flex flex-1 basis-0 border-l border-gray-200">
						<a
							href="/activities/edit/{id}/"
							class="focus:ring-blue relative inline-flex flex-1 basis-0 items-center
                justify-center rounded-br-lg border border-transparent py-2 text-xs
                font-medium leading-4 text-gray-700
                transition duration-150
                ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300
                focus:outline-none">
							<Icon data={cog} class="h-4 w-4" />
							<span class="ml-3">Edit</span>
						</a>
					</div>
				{/if}
			{/if}
		</div>

		{#if !hasExpired}
			<div class="flex-none border-t border-gray-200">
				<div class="-mt-px flex">
					{#if targetLocation === 'IN_PERSON'}
						<div class="-ml-px flex w-0 flex-1">
							<div
								class="flex w-full justify-center space-x-8 rounded-br-lg rounded-bl-lg border border-transparent bg-that-blue py-2 text-xs font-medium  text-white">
								<div class="flex justify-center space-x-2">
									<Icon data={user} class="h-4 w-4" />
									<span>In-Person</span>
								</div>

								<div class="flex justify-center space-x-2">
									<Icon data={mapMarker} class="h-4 w-4" />
									<span>{lookupEnumLabel(location?.destination)}</span>
								</div>
							</div>
						</div>
					{:else if canJoin}
						<div class="-ml-px flex w-0 flex-1">
							<CardLink href={joinUrl} icon={signIn} text={'Join In'} />
						</div>
					{:else}
						<div class="-ml-px flex w-0 flex-1">
							<div
								class="relative inline-flex w-0 flex-1 items-center justify-center
                rounded-br-lg rounded-bl-lg border border-transparent py-2 text-xs
                font-medium leading-4 text-gray-300 transition duration-150
                ease-in-out">
								<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4" />
								<span>Join {timeLeftToJoin}</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}
