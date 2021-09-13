<script context="module">
</script>

<script>
	import { browser } from '$app/env';
	import { v4 as uuidv4 } from 'uuid';

	import { onMount, onDestroy, setContext } from 'svelte';
	import { navigating } from '$app/stores';

	import * as Sentry from '@sentry/browser';
	import LogRocket from 'logrocket';
	import lodash from 'lodash';

	import loading from '$stores/loading';
	import { createAuth } from '$utils/security';
	import config from '$utils/config';
	import cart from '$utils/cart';
	import Preloading from '$components/preloading.svelte';

	import Tailwindcss from '$elements/Tailwindcss.svelte';

	// import { showReleaseNotes } from '$stores/siteVersion';
	// import { messages } from '$stores/notificationCenter';

	const { isEmpty } = lodash;
	const { isAuthenticated, thatProfile } = createAuth();

	setContext('cart', cart);

	// function createCorrelationId() {
	// 	const id = uuidv4();
	// 	LogRocket.info('correlationId', id);

	// 	Sentry.configureScope((scope) => {
	// 		scope.setTag('correlationId', id);
	// 	});

	// 	return id;
	// }

	// function onTidioChatApiReady() {
	// 	/*
	//     resets the z-index of the tidio iframe such that it's under warnings.
	//     ... we might have to set it better based on some other layering going on in places.
	//   */
	// 	document.getElementById('tidio-chat-iframe').style.zIndex = '40';

	// 	unsub = thatProfile.subscribe((currentUser) => {
	// 		if (!isEmpty(currentUser)) {
	// 			window.tidioChatApi.setVisitorData({
	// 				distinct_id: currentUser.id,
	// 				email: currentUser.email,
	// 				name: `${currentUser.firstName} ${currentUser.lastName}`
	// 			});

	// 			window.tidioChatApi.setContactProperties({
	// 				company: currentUser.company,
	// 				canfeature: currentUser.canFeature ? 'true' : 'false'
	// 			});

	// 			window.tidioChatApi.addVisitorTags([
	// 				currentUser.id,
	// 				`https://that.us/member/${currentUser.profileSlug}`
	// 			]);
	// 		}
	// 	});
	// }

	// let client = initClient({
	// 	url: config.api,
	// 	fetchOptions: () => ({
	// 		headers: {
	// 			authorization: $token ? `Bearer ${$token}` : '',
	// 			'that-site': 'that.us'
	// 			// 'that-correlation-id': createCorrelationId()
	// 		}
	// 	}),
	// 	// todo.. this needs to be revisited... and when we get a new graph client.
	// 	// requestPolicy: 'cache-and-network',
	// 	requestPolicy: 'network-only'
	// });

	// router.subscribe((e) => {
	// 	if (!e.initial) {
	// 		window.woopra.track();
	// 	}
	// });

	onMount(() => {
		// if ($showReleaseNotes) {
		// 	messages.update((m) => [
		// 		...m,
		// 		{
		// 			message: '🙌 We shipped again! 🎉 Check out newest features on THAT.us!!!',
		// 			url: '/changelog-missed'
		// 		}
		// 	]);
		// }
		// if (browser) {
		// 	if (window.tidioChatApi) {
		// 		window.tidioChatApi.on('ready', onTidioChatApiReady);
		// 	} else {
		// 		document.addEventListener('tidioChat-ready', onTidioChatApiReady);
		// 	}
		// }
	});

	// onDestroy(unsub);

	// $: if (!isEmpty($thatProfile)) {
	// 	let { id, email, firstName, lastName } = $thatProfile;

	// 	Sentry.configureScope((scope) => {
	// 		scope.setUser({
	// 			email,
	// 			id
	// 		});
	// 	});

	// 	LogRocket.identify(id, {
	// 		email
	// 	});

	// 	woopra.identify({
	// 		id,
	// 		email,
	// 		name: `${firstName} ${lastName}`
	// 	});
	// }
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3" async></script>
</svelte:head>

<div>
	{#if $navigating || $loading}
		<Preloading />
	{/if}

	<slot />

	<Tailwindcss />
</div>

<style global>
	.tag-form-input :global(.svelte-tags-input-tag) {
		background: #252f3f;
	}

	.sveltejs-forms .field.error input,
	.sveltejs-forms .field.error textarea {
		--text-opacity: 1;
		border: 1px solid rgba(224, 36, 36, var(--text-opacity));
	}
	.sveltejs-forms .field.error .message {
		margin-top: 0.2rem;
		font-style: italic;
		--text-opacity: 1;
		color: rgba(224, 36, 36, var(--text-opacity));
	}

	select {
		/* for Firefox */
		-moz-appearance: none;
		/* for Safari, Chrome, Opera */
		-webkit-appearance: none;
	}

	.lineBreaks {
		white-space: pre-line;
	}

	/* * {
    outline: 1px solid red;
  } */
</style>
