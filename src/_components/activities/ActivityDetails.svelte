<script>
	export let activity;
	export let sessionLocation;
	export let sessionLookups;

	// 3rd Party
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
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
	} from 'svelte-awesome/icons';
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import config from '$utils/config';
	import favoritesApi from '$dataSources/api.that.tech/favorites';
	import currentEvent from '$stores/currentEvent';
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
		slug,
		favoritedBy = [],
		eventId,
		event,
		targetLocation,
		type,
		longDescription,
		prerequisites,
		takeaways,
		agenda,
		supportingArtifacts
	} = activity;

	const { toggle, get: getFavorites, favoritesStore: favorites } = favoritesApi();
	const isDailyActivity = config.eventId === eventId;

	// Enum Lookups
	let sessionTargetLocation =
		sessionLookups.targetLocation.options.find((x) => x.value === targetLocation)?.label ||
		'Online';
	let sessionTargetLocationIcon =
		targetLocation === 'EITHER' ? exchange : targetLocation === 'IN_PERSON' ? user : globe;
	let sessionType = sessionLookups.sessionType.options.find((x) => x.value === type)?.label;
	let sessionLocationDestination = sessionLookups.sessionLocationDestinations.options.find(
		(x) => x.value === sessionLocation?.destination
	)?.label;

	let host = speakers[0];
	let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

	let edit = $page.query.get('edit');
	let isNew = $page.query.get('isNew');
	let isUpdated = $page.query.get('isUpdated');

	let favoriteDisabled = false;

	let incompleteProfile = true;
	$: if (!isEmpty($session.thatProfile)) {
		incompleteProfile = false;
	}

	const handleToggle = async () => {
		favoriteDisabled = true;
		await toggle(id, $currentEvent.eventId);
		favoriteDisabled = false;
	};

	let isFavorite = false;

	favorites.subscribe((favs) => {
		let found = find(favs, (i) => i.id === id);

		found ? (isFavorite = true) : (isFavorite = false);
	});

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

		if ($session.isAuthenticated) await getFavorites($currentEvent.eventId);

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
					const join = $page.query.get('join');
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
		return imageUrl ? `${imageUrl}${imageCrop}` : config.defaultProfileImage;
	}
</script>

{#if isNew}
	<Success title="Created {title}!" text="Thank you for submitting an activity." />
{:else if isUpdated}
	<Success title="Success 🎊" text="Successfully updated {title}." />
{/if}

<div>
	<!--header-->
	<div class="px-4 py-5 border-b border-gray-300 sm:px-6">
		<div
			class="flex justify-between md:items-end items-center flex-wrap sm:flex-nowrap flex-col md:flex-row"
		>
			<div class="block">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
					{#each speakers as s}
						<div class="flex md:flex-row flex-col items-center">
							<div class="flex-shrink-0">
								<a href="/members/{s.profileSlug}/" open>
									<span class="inline-block relative">
										<img
											class="h-24 w-24 rounded-full"
											src={getProfileImage(s.profileImage)}
											alt=""
											loading="lazy"
										/>

										{#if s.earnedMeritBadges.length > 0}
											<span class="absolute bottom-0 left-0 block h-8 w-8">
												<img
													src={s.earnedMeritBadges[0].image}
													alt={s.earnedMeritBadges[0].name}
													loading="lazy"
												/>
											</span>
										{/if}
									</span>
								</a>
							</div>
							<div class="flex-initial md:ml-4">
								<div class="flex flex-col md:items-start items-center">
									<h3 class="text-lg leading-6 font-medium text-gray-900 inline-block">
										{`${s.firstName} ${s.lastName}`}
									</h3>
									{#if type !== 'OPEN_SPACE' && s.profileSlug != 'thatconference'}
										<span class="flex flex-row items-center overflow-clip">
											<span class="text-that-red text-lg font-medium inline">Camp Counselor</span>
										</span>
									{/if}
								</div>
								<div class="md:text-left text-center">
									{#each s.profileLinks as link, i}
										<SocialLink
											href={link.url}
											network={link.linkType}
											isLast={i === s.profileLinks?.length - 1}
										/>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-wrap justify-center items-center mt-2 md:mt-0">
				{#if !hasExpired}
					{#if $session.isAuthenticated && !incompleteProfile}
						<div class="mt-2 mx-2 rounded-md shadow-sm">
							<button
								type="button"
								on:click|preventDefault={!favoriteDisabled && handleToggle}
								class:text-thatRed-500={isFavorite}
								class="relative inline-flex items-center px-4 py-2 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-gray-700 bg-white hover:text-gray-500 focus:outline-none
                  focus:ring-blue focus:border-blue-300
                  active:bg-gray-50 active:text-gray-800 transition duration-150
                  ease-in-out"
							>
								<Icon data={heart} class="-ml-1 mr-2 h-4 w-4" />
								{#if isFavorite}
									<span>Unfavorite</span>
								{:else}<span>Favorite</span>{/if}
							</button>
						</div>
					{:else}
						<div class="mt-2 mx-2 rounded-md shadow-sm">
							<a
								href="/login/"
								class="relative inline-flex items-center px-4 py-2 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-gray-700 bg-white hover:text-gray-500 focus:outline-none
                  focus:ring-blue focus:border-blue-300
                  active:bg-gray-50 active:text-gray-800 transition duration-150
                  ease-in-out"
							>
								<Icon data={heart} class="-ml-1 mr-2 h-4 w-4" />
								<span>Favorite</span>
							</a>
						</div>
					{/if}
				{/if}

				{#if $session.isAuthenticated && !incompleteProfile}
					{#if canEdit()}
						<div class="mt-2 mx-2 rounded-md shadow-sm">
							<a
								href={`/activities/edit/${id}`}
								type="button"
								class="inline-flex justify-center py-2 px-4 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-thatBlue-500 bg-white hover:bg-thatBlue-500
                  hover:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
							>
								<Icon data={cog} class="-ml-1 mr-2 h-4 w-4" />
								<span>Edit</span>
							</a>
						</div>
					{/if}
				{/if}

				{#if !hasExpired}
					<!-- <div class="mt-2 mx-2 rounded-md shadow-sm">
						<div
							class="border-2 border-thatBlue-500 text-sm leading-5
              font-medium rounded-md text-thatBlue-500 bg-white
              hover:bg-thatBlue-500 hover:text-white focus:outline-none
              focus:ring-thatBlue-500 focus:bg-thatBlue-500
              focus:text-white focus:border-thatBlue-800
              active:bg-thatBlue-800 transition duration-150 ease-in-out"
						>
							<CalendarButton
								{title}
								{shortDescription}
								{id}
								{startTime}
								{durationInMinutes}
								{slug}
							/>
						</div>
					</div> -->

					{#if activity.type === 'KEYNOTE'}
						<div class="mt-2 mx-2 rounded-md shadow-sm">
							<a
								type="button"
								href="https://youtube.com/c/thatconference"
								class="relative inline-flex justify-center py-2 px-4 border-2
              border-thatBlue-500 text-sm leading-5 font-medium rounded-md
              text-thatBlue-500 bg-white hover:bg-thatBlue-500
              hover:text-white focus:outline-none
              focus:ring-thatBlue-500 focus:bg-thatBlue-500
              focus:text-white focus:border-thatBlue-800
              active:bg-thatBlue-800 transition duration-150 ease-in-out"
							>
								<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4 text-gray-400" />
								<span>Watch on YouTube</span>
							</a>
						</div>
					{:else if targetLocation != 'IN_PERSON'}
						{#if canJoin}
							<div class="mt-2 mx-2 rounded-md shadow-sm">
								<a
									type="button"
									href="/join/{id}"
									class="relative inline-flex justify-center py-2 px-4 border-2
                  border-thatBlue-500 text-sm leading-5 font-medium rounded-md
                  text-thatBlue-500 bg-white hover:bg-thatBlue-500
                  hover:text-white focus:outline-none
                  focus:ring-thatBlue-500 focus:bg-thatBlue-500
                  focus:text-white focus:border-thatBlue-800
                  active:bg-thatBlue-800 transition duration-150 ease-in-out"
								>
									<Icon data={signIn} class="-ml-1 mr-2 h-4 w-4 text-gray-400" />
									<span>Join In</span>
								</a>
							</div>
						{:else}
							<span class="mt-2 mx-2 rounded-md shadow-sm">
								<div
									class="relative inline-flex items-center px-4 py-2 border-2
                  border-gray-300 text-sm leading-5 font-medium rounded-md
                  text-gray-400 bg-white"
								>
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
	<div class="w-full flex flex-col sm:flex-row space-x-6">
		<div class="flex-auto px-4 py-5 sm:px-6 text-center md:text-left">
			<!-- Title -->
			<h2
				class="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-10
        font-extrabold text-thatBlue-800 sm:leading-none"
			>
				{title}
			</h2>

			<div
				class="py-4 flex flex-col sm:flex-row justify-center sm:justify-start items-center space-x-0 sm:space-x-8 space-y-4 sm:spaace-y-0"
			>
				{#if !isDailyActivity}
					<div class="h-24 w-24">
						<a href={`/events/${event.slug}`} class="w-full h-full">
							<img src={event.logo} alt="Event Logo" loading="lazy" />
						</a>
					</div>
				{/if}

				<div>
					<!-- Start Time -->
					<p class="text-base text-gray-700  sm:text-lg sm:mx-auto md:text-xl lg:mx-0">
						{#if durationInMinutes <= 60}
							{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}, for
							{dayjs.duration(durationInMinutes, 'minutes').as('hours')}
							hour.
						{:else}
							{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}, for
							{dayjs.duration(durationInMinutes, 'minutes').as('hours')}
							hours.
						{/if}
					</p>

					<!-- Location -->
					<p
						class="mt-1 text-base text-gray-700 sm:mt-2 sm:text-lg sm:mx-auto md:mt-1 md:text-xl lg:mx-0"
					>
						<Icon
							data={sessionTargetLocationIcon}
							class="h-4 w-4 pb-0.5 mr-2"
						/>{sessionTargetLocation}
						{sessionType}
					</p>

					{#if targetLocation === 'IN_PERSON' && sessionLocationDestination}
						<p
							class="mt-1 text-base text-gray-700 sm:mt-2 sm:text-lg sm:mx-auto md:mt-1 md:text-xl lg:mx-0"
						>
							<Icon data={mapMarker} class="h-4 w-4 pb-0.5 mr-2" />Room: {sessionLocationDestination}
						</p>
					{/if}
				</div>
			</div>

			<!-- Tags -->
			<div
				class="mt-4 text-base text-gray-700 sm:text-lg sm:mx-auto  md:text-xl lg:mx-0 flex flex-wrap content-start space-x-4"
			>
				{#each tags as t}
					<Tag>{t}</Tag>
				{/each}
			</div>

			<!-- Description -->
			<p
				class="mt-3 sm:mt-5 sm:mx-auto lg:mx-0 prose lineBreaks text-gray-500 sm:text-lg md:text-xl"
			>
				{#if longDescription}
					{longDescription}
				{:else}
					{shortDescription}
				{/if}
			</p>

			{#if type === 'WORKSHOP'}
				<div class="mt-12">
					<h3 class="text-xl sm:text-2xl leading-8 font-extrabold tracking-tight text-thatBlue-800">
						Agenda
					</h3>
					<p
						class="mt-3 sm:mt-5 sm:mx-auto lg:mx-0 prose lineBreaks text-gray-500 sm:text-lg md:text-xl"
					>
						{#if agenda}
							{agenda}
						{/if}
					</p>
				</div>
			{/if}

			{#if prerequisites}
				<div class="mt-12">
					<h3 class="text-xl sm:text-2xl leading-8 font-extrabold tracking-tight text-thatBlue-800">
						Prerequisites
					</h3>
					<p
						class="mt-3 sm:mt-5 sm:mx-auto lg:mx-0 prose lineBreaks text-gray-500 sm:text-lg md:text-xl"
					>
						{prerequisites}
					</p>
				</div>
			{/if}

			{#if takeaways?.length > 0}
				<div class="mt-12">
					<h3 class="text-xl sm:text-2xl leading-8 font-extrabold tracking-tight text-thatBlue-800">
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
					<h3 class="text-xl sm:text-2xl leading-8 font-extrabold tracking-tight text-thatBlue-800">
						Supporting Resources
					</h3>
					<div class="mt-2">
						<ul>
							{#each supportingArtifacts as sa, i}
								<li
									class="px-4 flex space-x-3 items-center hover:text-that-blue cursor-pointer pb-2"
									class:bg-gray-50={showBackground(i)}
								>
									<div>
										<Icon data={externalLink} class="h-4 w-4" />
									</div>
									<div class="flex-grow p-2 rounded-md">
										<a open href={sa.url}>
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
			<div class="py-12 flex flex-wrap items-center text-red-400 space-x-1">
				<Icon data={heartO} class="h-8 w-8" />
				<span>favorited by:</span>
				<div class="md:pl-2">
					<Avatars attendees={favoritedBy} />
				</div>
			</div>
		</div>
	</div>
</div>
