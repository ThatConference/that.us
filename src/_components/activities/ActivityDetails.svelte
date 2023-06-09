<script>
	export let activity;
	export let sessionLocation;

	// 3rd Party
	import { onMount, getContext } from 'svelte';
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import utc from 'dayjs/plugin/utc.js';
	import duration from 'dayjs/plugin/duration.js';

	import Icon from 'svelte-awesome';
	import {
		cog,
		exchange,
		globe,
		heartO,
		heart,
		mapMarker,
		signIn,
		user,
		externalLink
	} from '$components/svelte-awesome-icons';
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import favorites, { toggle } from '$lib/stores/favorites';
	import buildImageSrc from '$utils/image';
	import config from '$utils/config.public';

	import { Avatars, Tag } from '$elements';

	// import CalendarButton from './elements/CalendarButton.svelte';
	import { SocialLink } from '../social';
	import Success from '../notifications/Success.svelte';

	dayjs.extend(isBetween);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(relativeTime);
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(duration);
	dayjs.extend(advancedFormat);

	const { isEmpty, find } = lodash;
	const {
		title,
		shortDescription,
		speakers,
		id,
		tags,
		startTime,
		status,
		durationInMinutes,
		favoritedBy = [],
		eventId,
		event,
		targetLocation,
		type,
		longDescription,
		prerequisites,
		takeaways,
		agenda,
		supportingArtifacts,
		primaryCategory
	} = activity;

	let dropDownKeyValuePairs = getContext('DROP_DOWN_KEY_VALUE_PAIRS');
	const isDailyActivity = config.eventId === eventId;

	// Enum Lookups
	let sessionTargetLocationIcon =
		targetLocation === 'EITHER' ? exchange : targetLocation === 'IN_PERSON' ? user : globe;
	let sessionType = dropDownKeyValuePairs.sessionType.options.find((x) => x.value === type)?.label;
	// Display replacements
	if (type === 'REGULAR') {
		if (primaryCategory === 'THAT') {
			sessionType = 'A THAT Conference Activity';
		} else {
			sessionType = sessionType.replace('60', durationInMinutes.toString());
		}
	}
	if (type === 'KEYNOTE') {
		sessionType = sessionType.replace('90', durationInMinutes.toString());
	}

	let sessionLocationDestination = dropDownKeyValuePairs.sessionLocationDestinations.options.find(
		(x) => x.value === sessionLocation?.destination
	)?.label;

	let edit = $page.url.searchParams.get('edit');
	let isNew = $page.url.searchParams.get('isNew');
	let isUpdated = $page.url.searchParams.get('isUpdated');

	let favoriteDisabled = false;

	let incompleteProfile = true;
	$: if (!isEmpty($page.data.user.profile)) {
		incompleteProfile = false;
	}

	const handleToggle = async () => {
		favoriteDisabled = true;
		await toggle(id, eventId);
		favoriteDisabled = false;
	};

	$: isFavorite = find($favorites, (i) => i.id === id) ? true : false;

	let isInWindow = false;
	$: canJoin = isInWindow;

	const canEdit = () => {
		let canEditMe = false;
		if (edit) {
			if (status === 'ACCEPTED') {
				if (dayjs(startTime).isSameOrAfter(dayjs(), 'day')) canEditMe = true;
			}
		}

		return canEditMe;
	};

	let timeLeftToJoin = 'in ...';
	let hasExpired = true;

	onMount(async () => {
		window.history.replaceState({}, null, `/activities/${id}`);

		let endTime = (durationInMinutes ? durationInMinutes : 60) + 10;

		if (status === 'ACCEPTED') {
			let currentStartTime = dayjs(startTime).subtract(5, 'minute');
			let currentEndTime = dayjs(startTime).add(endTime, 'minute');

			hasExpired = dayjs().isAfter(currentEndTime);

			const interval = setInterval(() => {
				timeLeftToJoin = dayjs().to(currentStartTime);
				let inSession = dayjs().isBetween(currentStartTime, currentEndTime);

				hasExpired = dayjs().isAfter(currentEndTime);
				isInWindow = inSession;

				if (!inSession) {
					const join = $page.url.searchParams.get('join');
					if (join) isInWindow = true;
				}
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	});

	function showBackground(i) {
		const result = i % 2;
		return result != 0;
	}

	function getProfileImage(imageUrl) {
		const userProfileImage = imageUrl || config.defaultProfileImage;
		return buildImageSrc(userProfileImage, ['96']);
	}

	function getSessionUrl() {
		let sessionUrl = `/join/${id}`;

		if (activity.targetLocation === 'OTHER') {
			if (activity.location?.url) sessionUrl = activity.location?.url;
		}

		return sessionUrl;
	}

	const joinUrl = getSessionUrl();
</script>

{#if isNew}
	<Success title="Created {title}!" text="Thank you for submitting an activity." />
{:else if isUpdated}
	<Success title="Success 🎊" text="Successfully updated {title}." />
{/if}

<div>
	<!--header-->
	<div class="border-b border-gray-300 px-4 py-5 sm:px-6">
		<div
			class="flex flex-col flex-wrap items-center justify-between sm:flex-nowrap md:flex-row md:items-end">
			<div class="block">
				<div class="grid grid-cols-1 gap-12 sm:grid-cols-2">
					{#each speakers as s}
						<div class="flex flex-col items-center md:flex-row">
							<div class="flex-shrink-0">
								<a href="/members/{s.profileSlug}/">
									<span class="relative inline-block">
										<img
											class="lazyload h-24 w-24 rounded-full"
											data-sizes="auto"
											data-src={getProfileImage(s.profileImage).src}
											data-srcset={getProfileImage(s.profileImage).srcset}
											alt="" />

										{#if s.earnedMeritBadges.length > 0}
											<span class="absolute bottom-0 left-0 block h-8 w-8">
												<img
													class="lazyload"
													src={s.earnedMeritBadges[0].image}
													alt={s.earnedMeritBadges[0].name} />
											</span>
										{/if}
									</span>
								</a>
							</div>
							<div class="flex-initial md:ml-4">
								<div class="flex flex-col items-center md:items-start">
									<h3 class="inline-block text-lg font-medium leading-6 text-gray-900">
										{`${s.firstName} ${s.lastName}`}
									</h3>
									{#if type !== 'OPEN_SPACE' && s.profileSlug != 'thatconference'}
										<span class="flex flex-row items-center overflow-clip">
											<span class="inline text-lg font-medium text-that-red">Camp Counselor</span>
										</span>
									{/if}
								</div>
								<div class="text-center md:text-left">
									{#each s.profileLinks as link, i}
										<SocialLink
											href={link.url}
											network={link.linkType}
											isLast={i === s.profileLinks?.length - 1} />
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-2 flex flex-wrap items-center justify-center md:mt-0">
				{#if !hasExpired}
					{#if $page.data.user.isAuthenticated && !incompleteProfile}
						<div class="mx-2 mt-2 rounded-md shadow-sm">
							<button
								type="button"
								on:click|preventDefault={!favoriteDisabled && handleToggle}
								class:text-thatRed-500={isFavorite}
								class="focus:ring-blue relative inline-flex items-center rounded-md border-2
                  border-thatBlue-500 bg-white px-4 py-2 text-sm
                  font-medium leading-5 text-gray-700 transition
                  duration-150 ease-in-out
                  hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50
                  active:text-gray-800">
								{#if isFavorite}
									<div class="text-red-500">
										<Icon data={heart} class="-ml-1 mr-2 h-4 w-4" />
										<span>Unfavorite</span>
									</div>
								{:else}
									<div>
										<Icon data={heartO} class="-ml-1 mr-2 h-4 w-4" />
										<span>Favorite</span>
									</div>
								{/if}
							</button>
						</div>
					{:else}
						<div class="mx-2 mt-2 rounded-md shadow-sm">
							<a
								rel="external"
								href="/login/"
								class="focus:ring-blue relative inline-flex items-center rounded-md border-2
                  border-thatBlue-500 bg-white px-4 py-2 text-sm
                  font-medium leading-5 text-gray-700 transition
                  duration-150 ease-in-out
                  hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50
                  active:text-gray-800">
								<Icon data={heart} class="-ml-1 mr-2 h-4 w-4" />
								<span>Favorite</span>
							</a>
						</div>
					{/if}
				{/if}

				{#if $page.data.user.isAuthenticated && !incompleteProfile}
					{#if canEdit()}
						<div class="mx-2 mt-2 rounded-md shadow-sm">
							<a
								href={`/activities/edit/${id}`}
								class="inline-flex justify-center rounded-md border-2 border-thatBlue-500
                  bg-white px-4 py-2 text-sm font-medium
                  leading-5 text-thatBlue-500 transition
                  duration-150 ease-in-out
                  hover:bg-thatBlue-500 hover:text-white
                  focus:border-thatBlue-800 focus:bg-thatBlue-500
                  focus:text-white focus:outline-none focus:ring-thatBlue-500 active:bg-thatBlue-800">
								<Icon data={cog} class="-ml-1 mr-2 h-4 w-4" />
								<span>Edit</span>
							</a>
						</div>
					{/if}
				{/if}

				{#if !hasExpired}
					{#if activity.type === 'KEYNOTE'}
						<div class="mx-2 mt-2 rounded-md shadow-sm">
							<a
								href="https://youtube.com/c/thatconference"
								class="relative inline-flex justify-center rounded-md border-2 border-thatBlue-500
              bg-white px-4 py-2 text-sm font-medium
              leading-5 text-thatBlue-500 transition
              duration-150 ease-in-out
              hover:bg-thatBlue-500 hover:text-white
              focus:border-thatBlue-800 focus:bg-thatBlue-500
              focus:text-white focus:outline-none focus:ring-thatBlue-500 active:bg-thatBlue-800">
								<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4 text-gray-400" />
								<span>Watch on YouTube</span>
							</a>
						</div>
					{:else if targetLocation != 'IN_PERSON'}
						{#if canJoin}
							<div class="mx-2 mt-2 rounded-md shadow-sm">
								<a
									href={joinUrl}
									class="relative inline-flex justify-center rounded-md border-2 border-thatBlue-500
                  bg-white px-4 py-2 text-sm font-medium
                  leading-5 text-thatBlue-500 transition
                  duration-150 ease-in-out
                  hover:bg-thatBlue-500 hover:text-white
                  focus:border-thatBlue-800 focus:bg-thatBlue-500
                  focus:text-white focus:outline-none focus:ring-thatBlue-500 active:bg-thatBlue-800">
									<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4 text-gray-400" />
									<span>Join In</span>
								</a>
							</div>
						{:else}
							<span class="mx-2 mt-2 rounded-md shadow-sm">
								<div
									class="relative inline-flex items-center rounded-md border-2 border-gray-300
                  bg-white px-4 py-2 text-sm font-medium
                  leading-5 text-gray-400">
									<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4" />
									<span>Join {timeLeftToJoin}</span>
								</div>
							</span>
						{/if}
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<!-- body -->
	<div class="flex w-full flex-col space-x-6 sm:flex-row">
		<div class="flex-auto px-4 py-5 text-center sm:px-6 md:text-left">
			<!-- Title -->
			<h2
				class="text-2xl font-extrabold leading-10 tracking-tight text-thatBlue-800
        sm:text-3xl sm:leading-none md:text-4xl">
				{title}
			</h2>

			<div
				class="sm:spaace-y-0 flex flex-col items-center justify-center space-x-0 space-y-4 py-4 sm:flex-row sm:justify-start sm:space-x-8">
				{#if !isDailyActivity}
					<div class="h-24 w-24">
						<a href={`/events/${event.slug}`} class="h-full w-full">
							<img class="lazyload" src={event.logo} alt="Event Logo" />
						</a>
					</div>
				{/if}

				<div>
					<!-- Start Time -->
					<p class="text-base text-gray-700  sm:mx-auto sm:text-lg md:text-xl lg:mx-0">
						{#if durationInMinutes > 0}
							{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}, for
							{dayjs.duration(durationInMinutes, 'minutes').as('hours')}
							{#if durationInMinutes <= 60}
								hour.
							{:else}
								hours.
							{/if}
						{/if}
					</p>

					<!-- Location -->
					<p
						class="mt-1 text-base text-gray-700 sm:mx-auto sm:mt-2 sm:text-lg md:mt-1 md:text-xl lg:mx-0">
						<Icon data={sessionTargetLocationIcon} class="mr-2 h-4 w-4 pb-0.5" />
						{sessionType}
					</p>

					{#if targetLocation === 'IN_PERSON' && sessionLocationDestination}
						<p
							class="mt-1 text-base text-gray-700 sm:mx-auto sm:mt-2 sm:text-lg md:mt-1 md:text-xl lg:mx-0">
							<Icon data={mapMarker} class="mr-2 h-4 w-4 pb-0.5" />Room: {sessionLocationDestination}
						</p>
					{/if}
				</div>
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap justify-center space-x-2 pb-3 lg:justify-start">
				{#each tags as t}
					<div class="py-2">
						<Tag>{t}</Tag>
					</div>
				{/each}
			</div>

			<!-- Description -->
			<p
				class="lineBreaks prose mt-3 text-gray-500 sm:mx-auto sm:mt-5 sm:text-lg md:text-xl lg:mx-0">
				{#if longDescription}
					{longDescription}
				{:else}
					{shortDescription}
				{/if}
			</p>

			{#if type === 'WORKSHOP'}
				<div class="mt-12">
					<h3 class="text-xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-2xl">
						Agenda
					</h3>
					<p
						class="lineBreaks prose mt-3 text-gray-500 sm:mx-auto sm:mt-5 sm:text-lg md:text-xl lg:mx-0">
						{#if agenda}
							{agenda}
						{/if}
					</p>
				</div>
			{/if}

			{#if prerequisites}
				<div class="mt-12">
					<h3 class="text-xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-2xl">
						Prerequisites
					</h3>
					<p
						class="lineBreaks prose mt-3 text-gray-500 sm:mx-auto sm:mt-5 sm:text-lg md:text-xl lg:mx-0">
						{prerequisites}
					</p>
				</div>
			{/if}

			{#if takeaways?.length > 0}
				<div class="mt-12">
					<h3 class="text-xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-2xl">
						Take Aways
					</h3>
					<div class="prose">
						<ul>
							{#each takeaways as t}
								<li>
									{t}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			{#if supportingArtifacts?.length > 0}
				<div class="mt-12">
					<h3 class="text-xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-2xl">
						Supporting Resources
					</h3>
					<div class="mt-2">
						<ul>
							{#each supportingArtifacts as sa, i}
								<li
									class="flex cursor-pointer items-center space-x-3 px-4 pb-2 hover:text-that-blue"
									class:bg-gray-50={showBackground(i)}>
									<div>
										<Icon data={externalLink} class="h-4 w-4" />
									</div>
									<div class="flex-grow rounded-md p-2">
										<a target="_blank" rel="external noopener" href={sa.url}>
											<p>{sa.name}</p>
											<p class="mt-1 text-sm text-gray-400">{sa.description}</p>
										</a>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			<!-- Avatars -->
			<div class="flex flex-wrap items-center space-x-1 py-12 text-red-400">
				<Icon data={heartO} class="h-8 w-8" />
				<span>favorited by:</span>
				<div class="md:pl-2">
					<Avatars attendees={favoritedBy} />
				</div>
			</div>
		</div>
	</div>
</div>
