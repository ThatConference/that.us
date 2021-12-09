<script>
	import { browser, dev } from '$app/env';
	import { onMount, getContext } from 'svelte';
	import * as Sentry from '@sentry/browser';
	import { loadStripe } from '@stripe/stripe-js';

	import config from '$utils/config';
	import { Cart as CartModal } from '$elements/modals';
	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';
	import orderMutations from '$dataSources/api.that.tech/orders/mutations';
	import CartItem from './_CartItem.svelte';

	const { state, send } = getContext('cart');

	function handleCheckout() {
		Sentry.addBreadcrumb({
			category: 'checkout',
			message: 'handle checkout called',
			level: Sentry.Severity.Info
		});

		const { eventId, cart } = $state.context;
		Sentry.setContext('cart', cart);

		const lineItems = Object.keys(cart).map((i) => ({
			productId: i,
			quantity: cart[i].qty,
			isBulkPurchase: cart[i].isBulkPurchase
		}));

		Sentry.setContext('lineItems', lineItems);

		if (!dev && browser) {
			//track LinkedIn event
			window.lintrk('track', { conversion_id: 6688825 });
		}

		return orderMutations()
			.createCheckoutSession(eventId, lineItems)
			.then((session) => stripe.redirectToCheckout({ sessionId: session }))
			.then(function (result) {
				// If redirectToCheckout fails due to a browser or network error, you should display the localized error message to your customer using error.message.
				if (result.error) {
					alert(result.error.message);
				}
			})
			.catch(function (error) {
				Sentry.captureException(error);
			});
	}

	let stripe;
	let orderTotal = 0.0;

	$: if ($state.context.cart) {
		const currentCart = $state.context.cart;
		const lineItems = Object.keys(currentCart);

		orderTotal = lineItems.reduce((acc, curr) => {
			const lineTotal = currentCart[curr].price * currentCart[curr].qty;
			return acc + lineTotal;
		}, 0.0);
	}

	onMount(async () => {
		stripe = await loadStripe(config.stripeKey);
	});

	function showBackground(i) {
		const result = i % 2;
		return result != 0;
	}

	function handleErrorContinue() {
		send('CONTINUE');
	}

	function handleReplaceCart() {
		const eventData = {
			...$state.context.addErrorEventData,
			type: 'REPLACE_CART'
		};

		send('REPLACE_CART', eventData);
	}
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/" async>
	</script>
</svelte:head>

{#if $state.matches('cart.cartError.invalidEvent')}
	<CartModal
		title="Purchasing Limitation"
		text="Currently, we only support purchasing items from one event per order."
	>
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleReplaceCart}>replace</StandardButton>
			<StandardButton on:click={handleErrorContinue}>keep</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.cartError.invalidProductType')}
	<CartModal
		title="Purchasing Limitation"
		text="You can purchase an event ticket or a membership but not both. If you have a membership, there is no need for an additional event ticket."
	>
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleReplaceCart}>replace</StandardButton>
			<StandardButton on:click={handleErrorContinue}>keep</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.new')}
	<section class="flex flex-col space-y-8">
		<div class="relative">
			<div class="relative flex justify-start">
				<span class="pr-3 bg-white text-lg font-medium text-gray-900">
					Your cart is currently empty.
				</span>
			</div>
		</div>

		<div class="flex space-x-4">
			<div>
				<StandardLink href="/events/">View Upcoming Events</StandardLink>
			</div>
			<div>
				<StandardLink href="/membership/">View Membership Options</StandardLink>
			</div>
		</div>
	</section>
{:else}
	<section class="flex flex-col space-y-8">
		<div class="relative">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300" />
			</div>
			<div class="relative flex justify-start">
				<span class="pr-3 bg-white text-lg font-medium text-gray-900"> Order Details </span>
			</div>
		</div>

		<div class="flex flex-col">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Item
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Description
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Price
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Quantity
									</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Update</span>
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{#each Object.keys($state.context.cart) as productKey, i (productKey)}
									<CartItem
										lineItem={$state.context.cart[productKey]}
										showBackground={showBackground(i)}
										on:cart_remove={({ detail: { id } }) =>
											send('REMOVE_ITEM', {
												id
											})}
										on:cart_update={({ detail }) =>
											send('UPDATE_QUANTITY', {
												...detail
											})}
									/>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-end">
			<div class="text-md font-medium text-gray-500 uppercase tracking-wider">
				<span class="px-4">Subtotal:</span>
				<span>$<span>{orderTotal.toFixed(2)}</span></span>
			</div>
		</div>

		<div class="flex justify-end">
			{#if $state.matches('verification.verified')}
				<div class="flex space-x-4">
					<StandardButton on:click={() => history.back()}>Continue Shopping</StandardButton>

					<StandardButton on:click={handleCheckout}>Continue to Complete Purchase</StandardButton>
				</div>
			{:else}
				<div
					class="px-8 py-2 rounded-md shadow text-base leading-6 font-medium text-white bg-gray-200 md:text-lg md:px-10"
				>
					Purchase Now
				</div>
			{/if}
		</div>
	</section>
{/if}
