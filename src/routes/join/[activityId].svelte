<script context="module">
	import sessionsApi from '$dataSources/api.that.tech/sessions.js';

	export async function load({ page }) {
		const { querySessionById } = sessionsApi(fetch);
		const { activityId } = page.params;

		const queryActivityDetails = () => querySessionById(activityId);

		return {
			props: {
				activityId,
				activityDetails: await queryActivityDetails()
			}
		};
	}
</script>

<script>
	export let activityId;
	export let activityDetails;

	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import lodash from 'lodash';
	import { goto } from '$app/navigation';
	import Icon from 'svelte-awesome';
	import { expand as expandIcon, compress as compressIcon } from 'svelte-awesome/icons';

	import seoMetaTags from '$utils/seo/metaTags';
	import { ModalError, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import WarningNotification from '$components/notifications/Warning.svelte';
	import Seo from '$components/Seo.svelte';

	import config from '$utils/config';

	import eventsApi from '$dataSources/api.that.tech/events/queries.js';

	const { isEmpty } = lodash;

	const { setAttendance } = sessionsApi();
	const { canAccessEvent } = eventsApi();

	const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
	const jitsiFrameTopBuffer = 340;

	let expanded = false;
	let api;
	let bgColor = 'bg-white';
	let isCurrentlySharing = false;
	let userMuted = true;
	let incompleteProfile = true;

	let displayName = 'Johnny 5'; // generate a fake name...
	let avatarUrl = config.defaultProfileImage;

	onMount(async () => {
		// todo.. it would be great if the server could do this.. but token
		if (activityDetails) {
			hasAccess = await canAccessEvent(activityDetails.eventId);
			if (!hasAccess) goto(`/join/access-denied/${activityId}`);
		}
	});

	function handleMuted({ muted }) {
		userMuted = muted;
	}

	// https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
	function initJitsi() {
		let toolButtonConfig = [
			'microphone',
			'camera',
			'closedcaptions',
			'desktop',
			'fullscreen',
			'fodeviceselection',
			'hangup',
			'profile',
			'chat',
			'etherpad',
			'settings',
			'raisehand',
			'videoquality',
			'filmstrip',
			'feedback',
			'stats',
			'shortcuts',
			'tileview',
			'videobackgroundblur',
			'download',
			'help',
			'mute-everyone'
		];

		if ($session.user['http://auth.that.tech/roles'].includes('Admin')) {
			toolButtonConfig.push(
				'recording',
				'livestreaming',
				// 'invite', we can already do this just by passing the url to someone.
				'sharedvideo',
				'security'
			);
		}

		const domain = 'meet.jit.si';
		const options = {
			roomName: `THAT-${activityId}`,
			width: '100%',
			height: window.document.body.scrollHeight - jitsiFrameTopBuffer,
			// https://github.com/jitsi/jitsi-meet/blob/master/config.js
			configOverwrite: {
				startAudioMuted: 5,
				// startWithAudioMuted: true,
				prejoinPageEnabled: false, // todo.. We could prolly drop our own image.
				// enableWelcomePage: true, // not sure what it does
				brandingRoomAlias: `https://that.us/join/THAT-${activityId}`,
				transcribingEnabled: true // doesn't seem to work, but it's listed as valid
			},
			// https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
			interfaceConfigOverwrite: {
				TOOLBAR_BUTTONS: toolButtonConfig,
				DEFAULT_REMOTE_DISPLAY_NAME: 'THAT Camper'
			},
			userInfo: {
				displayName: `${$session.thatProfile?.firstName} ${$session.thatProfile?.lastName}`
			},
			onload: () => {
				// update here just to cover loading scenarios
				api.executeCommand('avatarUrl', avatarUrl);
				api.executeCommand('displayName', displayName);

				api.getIFrame().focus();
				handleResize();
			},

			parentNode: document.getElementById('meet')
		};

		api = new window.JitsiMeetExternalAPI(domain, options);
		api.addEventListener('audioMuteStatusChanged', handleMuted);

		api.addEventListener('readyToClose', () => {
			goto('/activities');
		});

		api.addEventListener('videoConferenceLeft', () => {
			// todo.. go back to event if it's part of an event.
			goto('/activities');
		});

		api.addEventListener('screenSharingStatusChanged', ({ on }) => {
			isCurrentlySharing = on;
			bgColor = isCurrentlySharing ? 'bg-red-500' : 'bg-white';
		});
	}

	function handleResize() {
		_setMainHeight();
		_setJitsoFrameSize();
		_setContentHeightWidth();
	}

	function expandJitsiFrame() {
		expanded = true;
		_setMainHeight();
		_setJitsoFrameSize();
		_setContentHeightWidth();
	}

	function shrinkJitsiFrame() {
		expanded = false;
		_setMainHeight();
		_setJitsoFrameSize();
		_setContentHeightWidth();
	}

	function _setMainHeight() {
		const main = window.document.getElementById('main');
		if (main) {
			main.style.minHeight = expanded ? `${window.innerHeight - 100}px` : 'auto';
		}
	}

	function _setContentHeightWidth() {
		const element = window.document.getElementById('content-block');

		if (element) {
			element.style.height = expanded ? `${window.innerHeight - 130}px` : '100%';
			element.style.width = expanded ? `${window.innerWidth - 50}px` : '100%';

			if (expanded) {
				element.classList.add('absolute', 'left-5');
				element.scrollIntoView();
			} else {
				element.classList.remove('absolute', 'left-5');
				window.scrollTo(0, 0);
			}

			// Property read to get webkit to repaint the element
			element.offsetHeight;
		}
	}

	function _setJitsoFrameSize() {
		const element = window.document.getElementById('jitsiConferenceFrame0');
		if (element) {
			if (expanded) {
				element.style.height = `${window.innerHeight - 180}px`;
			} else {
				element.style.height = `${window.innerHeight - jitsiFrameTopBuffer}px`;
			}
		}
	}

	$: if (!isEmpty($session.thatProfile)) {
		incompleteProfile = false;
	}

	$: if ($session.isAuthenticated && !incompleteProfile) {
		Promise.resolve(setAttendance(activityId));

		avatarUrl = `${$session.thatProfile.profileImage}${imageCrop}`;
		displayName = `${$session.thatProfile.firstName} ${$session.thatProfile.lastName}`;

		if (api) {
			api.executeCommand('avatarUrl', avatarUrl);
			api.executeCommand('displayName', displayName);
		}
	}

	const metaTags = ((title = 'Join In - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Join in the conversation today.',
			openGraph: {
				type: 'website',
				url: `https://that.us/join`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<svelte:window on:resize={handleResize} />

<svelte:head>
	<script src="https://meet.jit.si/external_api.js" on:load={initJitsi}>
	</script>
</svelte:head>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if incompleteProfile}
	<ModalError
		title="Oh NO! You have an incomplete profile!"
		text="It appears you haven't created your profile yet. You can't join an activity until that's complete."
		action={{ title: 'Create Profile', href: '/my/profiles/primary' }}
		returnTo={{ title: 'Return to Activities', href: '/activities' }}
	/>
{/if}

<StackedLayout bodyBackgroundColor={bgColor}>
	<div slot="header">
		<Nav />

		{#if activityDetails}
			<ActionHeader title={activityDetails.title}>
				<a href="/activities/{activityId}">Activity Details</a>
			</ActionHeader>
		{/if}
	</div>

	<div slot="body" class="relative">
		<button
			class="absolute top-12 left-0 cursor-pointer ml-48 mt-1"
			on:click={expanded ? shrinkJitsiFrame : expandJitsiFrame}
		>
			<Icon data={expanded ? compressIcon : expandIcon} class="h-6 w-6 text-white" />
		</button>
		<div id="meet" class="object-center" />
	</div>

	<div slot="footer">
		{#if userMuted}
			<WarningNotification
				message="You're currently muted. Click to unmute"
				on:click={() => api.executeCommand('toggleAudio')}
			/>
		{/if}
	</div>
</StackedLayout>
