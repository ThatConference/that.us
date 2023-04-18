<script>
	export let data;

	import '../app.css';

	import { onMount, setContext } from 'svelte';
	import { navigating, page } from '$app/stores';
	import { browser, dev } from '$app/environment';
	import lodash from 'lodash';
	import * as Sentry from '@sentry/svelte';
	import LogRocket from 'logrocket';

	import loading from '$stores/loading';
	import { showReleaseNotes } from '$stores/siteVersion';
	import { messages } from '$stores/notificationCenter';

	import cart from '$utils/cart';
	import claimTicket from '$utils/claimTicket';

	import Preloading from '$components/preloading.svelte';

	// setup the context on the cart for later usage
	setContext('claimTicket', claimTicket);
	setContext('cart', cart);
	setContext('correlationId', data.correlationId);
	setContext('DROP_DOWN_KEY_VALUE_PAIRS', data.dropDownKeyValuePairs);

	const { isEmpty } = lodash;

	navigating.subscribe((event) => {
		if (event) {
			if (!dev && browser) {
				let { to } = event;
				let _hsq = (window._hsq = window._hsq || []);
				_hsq.push(['setPath', to.url.pathname]);
				_hsq.push(['trackPageView']);
			}
		}
	});

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
	});

	$: if (!isEmpty($page.data.user.profile)) {
		if (!dev && browser) {
			let { id, email, firstName, lastName } = $page.data.user.profile;

			Sentry.setUser({
				email,
				id
			});

			LogRocket.identify(id, {
				email
			});

			let _hsq = (window._hsq = window._hsq || []);
			_hsq.push([
				'identify',
				{
					email,
					id,
					firstName,
					lastName
				}
			]);
		}
	}
</script>

<div>
	{#if $navigating || $loading}
		<Preloading />
	{/if}

	<slot />
</div>

<style>
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

	:global(.centerIcon) {
		--size: 100px;
		position: fixed;
		top: 0;
		left: 0;
		inset: calc(50% - calc(var(--size) / 2));
		border-radius: var(--size);
		height: var(--size);
		width: var(--size);
	}
</style>
