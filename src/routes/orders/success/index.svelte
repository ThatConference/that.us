<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink, Standard as StandardLink } from '$elements/links';

	const metaTags = ((title = 'Payment Received - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your payment was successfully received.',
			openGraph: {
				type: 'website',
				url: `https://that.us/orders/success/`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	/*
		event location - EL=wi,tx,thatus
		has membership - M=0
		is bulk purchase - B=1
		target location - [TL=on&TL=at]
	*/

	const isBulkPurchase = $page.query.has('B') ? Boolean(parseInt($page.query.get('B'))) : false;
	const isMembership = $page.query.has('M') ? Boolean(parseInt($page.query.get('M'))) : false;
	const eventLocation = $page.query.has('EL') ? $page.query.get('EL') : undefined;
	const targetLocations = $page.query.has('TL') ? $page.query.getAll('TL') : [];
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="space-y-12">
	<div class="text-base max-w-prose mx-auto lg:max-w-none">
		<h2 class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
			Payment Received
		</h2>
		<p
			class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
		>
			Thank You
		</p>
	</div>

	<div class="relative">
		<div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
			<p>
				Our passion is people, communities, and helping one another become a better geeks than they
				were yesterday. We couldn't do this without you and your support. <span class="font-bold"
					>Thank You!</span
				>
			</p>

			<h3>Order confirmation and receipt</h3>
			<p>
				If you've landed here, that means all of the crazy squirrels in the clouds did their jobs.
				You should see two confirmation emails in your inbox, a receipt from the credit card
				processor and a welcome message from THAT. <span class="font-bold"
					>If you do not see those, please check your junk/spam folders, as sometimes we manage to
					land there accidentally.</span
				>
				At any time you can view your
				<a class="hover" href="/my/settings/order-history/">order history</a> and reprint your receipt.
			</p>

			<div class="my-8 flex justify-center md:justify-end">
				<StandardLink href="/my/settings/order-history/">View Your Order History</StandardLink>
			</div>

			<h3>Next steps</h3>
			<p>Based on your purchase we have a few follow up things you.</p>

			{#if eventLocation}
				{#if targetLocations.length > 0}
					<h4>You have event tickets!!!</h4>

					{#if targetLocations.includes('AT')}
						<p>
							First things first, let's get your travel and rooms sorted. Just head over to our
							travel page for room blocks, addresses, and other details.
						</p>

						<div class="my-8 flex justify-center md:justify-end">
							{#if eventLocation.toUpperCase() === 'WI'}
								<StandardLink href="/support/travel/wi/">Book Your Travel To Wisconsin</StandardLink
								>
							{/if}
							{#if eventLocation.toUpperCase() === 'TX'}
								<StandardLink href="/support/travel/tx/">Book Your Travel To Texas</StandardLink>
							{/if}
						</div>

						<p>
							Soon we will also send you an email asking for your dietary restrictions, shirt sizes,
							and a few other items.
						</p>
					{/if}

					{#if targetLocations.includes('ON')}
						<p>
							No further action is required for your <span class="font-extrabold">ON THAT</span> tickets.
							Ok, small lie there. You now have access to that event and are free to start adding to
							the schedule. That's correct; you can add sessions as well, and make sure to select the
							right event.
						</p>

						<div class="my-8 flex justify-center md:justify-end">
							<StandardLink href="/activities/create/">Create an Activity</StandardLink>
						</div>
					{/if}
				{/if}
			{/if}

			{#if isBulkPurchase}
				<h4>Action Required - You have unallocated tickets.</h4>
				<p>
					You've purchased multiple tickets, and some or all of those tickets now need to be
					allocated to someone. To gain access, that someone has to have a valid account on THAT.us.
					You need that user's email address to assign the ticket. Once assigned, THAT.us will
					contact them and take care of the rest.
				</p>
				{#if targetLocations.includes('AT')}
					<p>
						If one of those tickets is for a spouse or child, they do not need to be allocated, but
						you will need to answer the follow-up questions on their behalf.
					</p>
				{/if}

				<div class="my-8 flex justify-center md:justify-end">
					<StandardLink href="/my/settings/order-history/">Allocate Tickets</StandardLink>
				</div>
			{/if}

			{#if isMembership}
				<h4>Thank you purchasing an annual membership.</h4>
				<p>
					We're grateful to have you as an annual member. Your membership helps us run the daily
					operations while also having direct input into how things evolve. You will soon see
					another email with a signup link to our private discord server.
				</p>
				<p>Once again, Thank You!</p>
			{/if}

			<h3>Anything else?</h3>
			<p>
				We're so glad you asked. There is always something going on at THAT, and we don't want you
				to miss anything.
			</p>
			<ul>
				<li>
					<a class="hover" href="/my/profiles/slack">Join us in Slack.</a>
				</li>
				<li>
					Get involved on THAT.us! Better yet, create an activity.
					<a class="hover" href="/support/">Learn how to get started.</a>
				</li>
				<li>
					Stay up to date. <a class="hover" href="/support/staying-up-to-date/"
						>Subscribe to the calendar.</a
					>
				</li>
				<li>
					Get ready for what's coming. Did you know we have an event every month?
					<a class="hover" href="/events/">Check out our past and upcoming events.</a>
				</li>
				<li>Signup for our newsletter!</li>
			</ul>

			<h3>Lastly, we’re here to help.</h3>
			<p>
				We're here to support you and the community. Anything we can do to improve, or if you wish
				there was a particular feature, please tell us. Our entire platform is open source, and
				everyone is invited to our sprint meeting; they're just activities.
			</p>
			<p>
				Do you run a user group, meetup, or conference? Is there a way we can support you? Let us
				know.
			</p>
			<p>
				At any time feel free to drop us a line <a
					href="mailto:hello@that.us"
					rel="noopener"
					target="_blank"
					class="hover">hello@that.us</a
				>
			</p>
		</div>
	</div>
</div>

<style>
	.hover:hover {
		@apply text-thatOrange-400;
		@apply underline;
		@apply text-thatOrange-500;
	}
</style>
