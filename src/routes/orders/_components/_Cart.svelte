<script>
	import { browser, dev } from '$app/environment';
	import { onMount, getContext } from 'svelte';
	import * as Sentry from '@sentry/svelte';
	import { loadStripe } from '@stripe/stripe-js';

	import config from '$utils/config.public';
	import { Cart as CartModal } from '$elements/modals';
	import { Action as ActionModal } from '$elements/modals';
	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';
	import orderMutations from '$dataSources/api.that.tech/orders/mutations';
	import CartItem from './_CartItem.svelte';
	import { tagEvent } from '$utils/tagEvent';

	const { state, send } = getContext('cart');
	let apiErrorMessage = '';

	async function handleCheckout() {
		Sentry.addBreadcrumb({
			category: 'checkout',
			message: 'handle checkout called',
			level: 'info'
		});

		Sentry.configureScope((scope) => scope.setTransactionName('Handle Checkout'));

		const { eventId, cart } = $state.context;
		Sentry.setContext('cart', cart);

		const lineItems = Object.keys(cart).map((i) => ({
			productId: i,
			quantity: cart[i].qty,
			isBulkPurchase: cart[i].isBulkPurchase
		}));

		Sentry.setContext('lineItems', lineItems);

		if (!dev && browser) {
			tagEvent('redirect-stripe', 'checkout');
		}

		try {
			const checkoutSessionResults = await orderMutations().createCheckoutSession(
				eventId,
				lineItems
			);

			if (checkoutSessionResults.success) {
				stripe.redirectToCheckout({ sessionId: checkoutSessionResults.stripeCheckoutId });
			} else {
				Sentry.captureException(checkoutSessionResults.message);
				// todo.. We should maybe display the message back to the user? or do something with it
				const msg = checkoutSessionResults.message ?? '';
				apiErrorMessage = msg.substring(msg.indexOf('ref:'));
				send('API_ERRORED');
			}
		} catch (error) {
			const sentryId = Sentry.captureException(error);
			apiErrorMessage = `ref: ${sentryId}`;
			send('API_ERRORED');
		}
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

	function handleClearCart() {
		send('CLEAR_CART');
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

	let activateRefundPolicyModal = false;
	function openRefundPolicyModal(showModal) {
		activateRefundPolicyModal = showModal;
	}
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/" async>
	</script>
</svelte:head>

{#if $state.matches('cart.cartError.invalidEvent')}
	<CartModal
		title="Purchasing Limitation"
		text="Currently, we only support purchasing items from one event per order.">
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleReplaceCart}>replace</StandardButton>
			<StandardButton on:click={handleErrorContinue}>keep</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.cartError.invalidProductType')}
	<CartModal
		title="Purchasing Limitation"
		text="You can purchase an event ticket or a membership but not both. Memberships and event tickets cannot be on the same order.">
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleReplaceCart}>replace</StandardButton>
			<StandardButton on:click={handleErrorContinue}>keep</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.cartError.inactiveEvent')}
	<CartModal
		title="Expired Event"
		text="The event you're trying to purchase a ticket for has expried.">
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleClearCart}>Reset and Continue</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.cartError.productNotOnSale')}
	<CartModal
		title="Ticket Not On Sale"
		text="The ticket you're trying to purchase isn't currently on sale.">
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleClearCart}>Reset and Continue</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.cartError.apiErrored') || false}
	<CartModal
		title="Whoops"
		text="We're sorry, it looks like our robots failed us. {apiErrorMessage}">
		<div class="flex justify-center space-x-6">
			<StandardButton on:click={handleErrorContinue}>Try Again</StandardButton>
		</div>
	</CartModal>
{/if}

{#if $state.matches('cart.new')}
	<section class="flex flex-col space-y-8">
		<div class="relative">
			<div class="relative flex justify-start">
				<span class="bg-white pr-3 text-lg font-medium text-gray-900">
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
		{#if activateRefundPolicyModal === true}
			<ActionModal
				title="Refund Policy"
				text="Ticket refunds will not be issued on any ticket <span class='font-bold'>30 days</span> before the event or thereafter. Prior to that, a $30.00 (per ticket) processing fee will be applied to each attendee ticket refund and a $10.00 (per ticket) processing fee will be applied to each family ticket refund. Memberships are non-refundable.">
				<div class="flex justify-center space-x-6">
					<StandardButton on:click={() => openRefundPolicyModal(false)}>Cancel</StandardButton>
					<StandardButton on:click={handleCheckout}>Agree and Continue</StandardButton>
				</div>
			</ActionModal>
		{/if}
		<div class="relative">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300" />
			</div>
			<div class="relative flex justify-start">
				<span class="bg-white pr-3 text-lg font-medium text-gray-900"> Order Details </span>
			</div>
		</div>

		<div class="flex flex-col">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Event
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Item
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Description
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Price
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Quantity
									</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Update</span>
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{#each Object.keys($state.context.cart) as productKey, i (productKey)}
									<CartItem
										eventDetails={$state.context.eventDetails}
										lineItem={$state.context.cart[productKey]}
										showBackground={showBackground(i)}
										on:cart_remove={({ detail: { id } }) =>
											send('REMOVE_ITEM', {
												id
											})}
										on:cart_update={({ detail }) =>
											send('UPDATE_QUANTITY', {
												...detail
											})} />
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-end">
			<div class="text-md font-medium uppercase tracking-wider text-gray-500">
				<span class="px-4">Subtotal:</span>
				<span>$<span>{orderTotal.toFixed(2)}</span></span>
			</div>
		</div>

		<div class="flex justify-end ">
			{#if $state.matches('verification.verified')}
				<div class="flex space-x-4">
					<StandardButton on:click={() => history.back()}>Continue Shopping</StandardButton>
					<StandardButton on:click={() => openRefundPolicyModal(true)}
						>Continue to Complete Purchase</StandardButton>
				</div>
			{:else}
				<div
					class="whitespace-nowrap rounded-md bg-gray-200 px-8 py-2 text-base font-medium leading-6 text-white shadow md:px-10 md:text-lg">
					Purchase Now
				</div>
			{/if}
		</div>
	</section>
{/if}
