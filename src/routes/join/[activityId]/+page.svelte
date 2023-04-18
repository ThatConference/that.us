<script>
	export let data;

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import lodash from 'lodash';
	import { goto } from '$app/navigation';
	import Icon from 'svelte-awesome';
	import { expand as expandIcon, compress as compressIcon } from '$components/svelte-awesome-icons';
	import { Circle3 } from 'svelte-loading-spinners';

	import sessionsApi from '$dataSources/api.that.tech/sessions';
	import seoMetaTags from '$utils/seo/metaTags';
	import { ModalError, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import WarningNotification from '$components/notifications/Warning.svelte';
	import Seo from '$components/Seo.svelte';

	import { tagEvent } from '$utils/tagEvent';
	import config, { analytics } from '$utils/config.public';

	let { activityId, activityDetails } = data;

	const { isEmpty } = lodash;
	const { setAttendance } = sessionsApi();
	const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
	const jitsiFrameTopBuffer = 340;

	let expanded = false;
	let api;
	let bgColor = 'bg-white';
	let isCurrentlySharing = false;
	let userMuted = true;
	let incompleteProfile = true;
	let jitsiLoaded = false;

	let displayName = 'Johnny 5'; // generate a fake name...
	let avatarUrl = config.defaultProfileImage;

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
			'mute-everyone',
			'participants-pane'
		];

		if ($page.data.user.baseUser['http://auth.that.tech/roles'].includes('Admin')) {
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
				prejoinPageEnabled: false,
				enableWelcomePage: false,
				enableClosePage: true,
				brandingRoomAlias: `https://that.us/join/THAT-${activityId}`,
				transcribingEnabled: true, // doesn't seem to work, but it's listed as valid
				toolbarButtons: toolButtonConfig,
				chromeExtensionBanner: undefined,
				analytics: {
					googleAnalyticsTrackingId: analytics.google
				}
			},
			// https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
			interfaceConfigOverwrite: {
				DEFAULT_REMOTE_DISPLAY_NAME: 'THAT Camper'
			},
			userInfo: {
				displayName: `${$page.data.user.profile?.firstName} ${$page.data.user.profile?.lastName}`
			},

			onload: () => {
				api.getIFrame().focus();
				handleResize();
				jitsiLoaded = true;
				api.executeCommand('toggleTileView');
			},

			parentNode: document.getElementById('meet')
		};

		api = new window.JitsiMeetExternalAPI(domain, options);

		api.addEventListener('audioMuteStatusChanged', handleMuted);

		api.addEventListener('readyToClose', () => {
			goto('/activities/');
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

	$: if (!isEmpty($page.data.user.profile)) {
		incompleteProfile = false;
	}

	$: if ($page.data.user.isAuthenticated && !incompleteProfile) {
		Promise.resolve(setAttendance(activityId));

		avatarUrl = `${$page.data.user.profile.profileImage}${imageCrop}`;
		displayName = `${$page.data.user.profile.firstName} ${$page.data.user.profile.lastName}`;

		if (jitsiLoaded) {
			api.executeCommand('avatarUrl', avatarUrl);
			api.executeCommand('displayName', displayName);
		}
	}

	const metaTags = ((title = activityDetails?.title || 'Join In - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Join in the conversation today.',
			openGraph: {
				type: 'website',
				url: `https://that.us/join/${activityId}`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	onMount(() => {
		initJitsi();
		tagEvent('join', 'activities');
	});
</script>

<svelte:window on:resize={handleResize} />

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if incompleteProfile}
	<ModalError
		title="Oh NO! You have an incomplete profile!"
		text="It appears you haven't created your profile yet. You can't join an activity until that's complete."
		action={{ title: 'Create Profile', href: '/my/profiles/primary' }}
		returnTo={{ title: 'Return to Activities', href: '/activities' }} />
{/if}

<StackedLayout bodyBackgroundColor={bgColor}>
	<div slot="header">
		<Nav />

		{#if activityDetails}
			<ActionHeader title={activityDetails.title}>
				<a
					href="/activities/{activityId}/"
					class="rounded-md border-2 border-thatBlue-500 bg-white px-8 py-3 text-base font-medium leading-6 text-thatBlue-500 shadow transition duration-150 ease-in-out hover:bg-thatBlue-500 hover:text-white focus:border-thatBlue-800 focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500 md:px-10 md:py-4 md:text-lg"
					target="_blank"
					rel="noopener">Activity Details</a>
			</ActionHeader>
		{/if}
	</div>

	<div slot="body" class="relative">
		<div>
			<button
				type="button"
				class="absolute left-5 top-6 cursor-pointer"
				on:click={expanded ? shrinkJitsiFrame : expandJitsiFrame}>
				<div class="flex h-12 w-[100px] items-center justify-center rounded-md bg-red-500">
					<Icon data={expanded ? compressIcon : expandIcon} class="h-8 w-8 text-white" />
				</div>
			</button>
		</div>
		{#if !jitsiLoaded}
			<div class="flex flex-col items-center justify-center">
				<p class="text-xl font-semibold">Loading room....</p>
				<p class="text-gray-500">
					If for some reason this message doesn't go away, please refresh.
				</p>
				<div class="flex flex-grow justify-center py-12">
					<div class="relative my-6 flex flex-col items-center space-y-6">
						<Circle3
							size={'60'}
							unit={'px'}
							ballTopLeft="#f74646"
							ballTopRight="#ff834d"
							ballBottomLeft="#26529A"
							ballBottomRight="#555555" />
					</div>
				</div>
			</div>
		{/if}

		<div id="meet" class="object-center" />
	</div>

	<div slot="footer">
		{#if userMuted}
			<WarningNotification
				message="You're currently muted. Click to unmute"
				on:click={() => api.executeCommand('toggleAudio')} />
		{/if}
	</div>
</StackedLayout>
