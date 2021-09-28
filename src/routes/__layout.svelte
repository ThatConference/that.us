<script context="module">
	import { v4 as uuidv4 } from 'uuid';
	import { dev } from '$app/env';
	import { inspect } from '@xstate/inspect';
	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import LogRocket from 'logrocket';
	import lodash from 'lodash';
	import config, { debug, logging } from '$utils/config';

	const correlationId = uuidv4();

	// if (!dev) {
	LogRocket.init(logging.logRocket);
	LogRocket.info('correlationId', correlationId);

	Sentry.init({
		dsn: logging.dsn,
		release: config.version,
		environment: logging.environment,
		debug: false,
		attachStacktrace: true,
		integrations: [new Integrations.BrowserTracing()]
	});

	LogRocket.getSessionURL((sessionURL) => {
		Sentry.configureScope((scope) => {
			scope.setExtra('LogRocketSession', sessionURL);
		});
	});

	Sentry.configureScope((scope) => {
		scope.setTag('correlationId', correlationId);
	});
	// }

	if (debug.xstate) {
		inspect({
			url: 'https://statecharts.io/inspect',
			iframe: false
		});
	}

	export async function load({}) {
		return {
			stuff: {
				correlationId
			},
			props: {
				correlationId
			}
		};
	}
</script>

<script>
	import { onMount, onDestroy, setContext } from 'svelte';
	import { navigating, session } from '$app/stores';
	import { browser } from '$app/env';
	import { page } from '$app/stores';

	import loading from '$stores/loading';
	import { showReleaseNotes } from '$stores/siteVersion';
	import { messages } from '$stores/notificationCenter';

	import cart from '$utils/cart';

	import Preloading from '$components/preloading.svelte';
	import Tailwindcss from '$elements/Tailwindcss.svelte';

	// setup the context on the cart for later usage
	setContext('cart', cart);
	setContext('correlationId', correlationId);

	const { isEmpty } = lodash;
	let unsub;

	function onTidioChatApiReady() {
		/*
      resets the z-index of the tidio iframe such that it's under warnings.
      ... we might have to set it better based on some other layering going on in places.
    */
		document.getElementById('tidio-chat-iframe').style.zIndex = '40';
		//todo.. how do we watch profile changes?
		// unsub = $session.thatProfile((currentUser) => {
		// 	if (!isEmpty(currentUser)) {
		// 		window.tidioChatApi.setVisitorData({
		// 			distinct_id: currentUser.id,
		// 			email: currentUser.email,
		// 			name: `${currentUser.firstName} ${currentUser.lastName}`
		// 		});
		// 		window.tidioChatApi.setContactProperties({
		// 			company: currentUser.company,
		// 			canfeature: currentUser.canFeature ? 'true' : 'false'
		// 		});
		// 		window.tidioChatApi.addVisitorTags([
		// 			currentUser.id,
		// 			`https://that.us/member/${currentUser.profileSlug}`
		// 		]);
		// 	}
		// });
	}

	onMount(() => {
		if ($showReleaseNotes) {
			messages.update((m) => [
				...m,
				{
					message: '🙌 We shipped again! 🎉 Check out newest features on THAT.us!!!',
					url: '/changelog-missed'
				}
			]);
		}

		if (window.tidioChatApi) {
			window.tidioChatApi.on('ready', onTidioChatApiReady);
		} else {
			document.addEventListener('tidioChat-ready', onTidioChatApiReady);
		}
	});

	$: if (!isEmpty($session.thatProfile)) {
		if (!dev) {
			let { id, email, firstName, lastName } = $session.thatProfile;

			Sentry.configureScope((scope) => {
				scope.setUser({
					email,
					id
				});
			});

			LogRocket.identify(id, {
				email
			});

			// woopra.identify({
			// 	id,
			// 	email,
			// 	name: `${firstName} ${lastName}`
			// });
		}
	}

	// onDestroy(unsub);

	$: $page.path,
		browser &&
			window.gtag('config', 'UA-21705613-11', {
				page_path: $page.path
			});
</script>

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

	/* for debuging purposes when we want to punch a wall.
		* {
    	outline: 1px solid red;
		} 
	*/
</style>
