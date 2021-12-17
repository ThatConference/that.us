<script context="module">
	import 'lazysizes';
	import { browser } from '$app/env';
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

	if (debug.xstate && browser) {
		inspect({
			url: 'https://statecharts.io/inspect',
			iframe: false
		});
	}

	export async function load() {
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
	import { onMount, setContext } from 'svelte';
	import { navigating, session } from '$app/stores';

	import { page } from '$app/stores';

	import loading from '$stores/loading';
	import { showReleaseNotes } from '$stores/siteVersion';
	import { messages } from '$stores/notificationCenter';

	import cart from '$utils/cart';

	import Preloading from '$components/preloading.svelte';

	// setup the context on the cart for later usage
	setContext('cart', cart);
	setContext('correlationId', correlationId);

	const { isEmpty } = lodash;

	function onTidioChatApiReady() {
		/*
      resets the z-index of the tidio iframe such that it's under warnings.
      ... we might have to set it better based on some other layering going on in places.
    */
		document.getElementById('tidio-chat-iframe').style.zIndex = '40';

		if (!isEmpty($session.thatProfile)) {
			if (!dev && browser) {
				window.tidioChatApi.setVisitorData({
					distinct_id: $session.thatProfile.id,
					email: $session.thatProfile.email,
					name: `${$session.thatProfile.firstName} ${$session.thatProfile.lastName}`
				});

				window.tidioChatApi.setContactProperties({
					company: $session.thatProfile.company,
					canfeature: $session.thatProfile.canFeature ? 'true' : 'false'
				});

				window.tidioChatApi.addVisitorTags([
					$session.thatProfile.id,
					`https://that.us/member/${$session.thatProfile.profileSlug}`
				]);
			}
		}
	}

	onMount(() => {
		if ($showReleaseNotes) {
			messages.update((m) => [
				...m,
				{
					message: '🙌 We shipped again! 🎉 Check out newest features on THAT.us!!!',
					url: '/releases/changelog-missed'
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
		if (!dev && browser) {
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

			window.woopra.identify({
				id,
				email,
				name: `${firstName} ${lastName}`
			});

			window.woopra.track();
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
</div>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';

	:global(.strike) {
		text-decoration: line-through;
	}

	:global(.prose a) {
		text-decoration: none;
		color: #26529a;
	}

	:global(.prose a:hover) {
		color: #ffffff;
	}

	:global(.lineBreaks) {
		white-space: pre-line;
	}

	:global(.tag-form-input .svelte-tags-input-tag) {
		background: #252f3f;
	}

	:global(.sveltejs-forms .field.error input, .sveltejs-forms .field.error textarea) {
		--text-opacity: 1;
		border: 1px solid rgba(224, 36, 36, var(--text-opacity));
	}
	:global(.sveltejs-forms .field.error .message) {
		margin-top: 0.2rem;
		font-style: italic;
		--text-opacity: 1;
		color: rgba(224, 36, 36, var(--text-opacity));
	}

	:global(select) {
		/* for Firefox */
		-moz-appearance: none;
		/* for Safari, Chrome, Opera */
		-webkit-appearance: none;
	}
</style>
