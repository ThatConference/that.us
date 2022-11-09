<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Standard as StandardLink } from '$elements/links';

	import Layout from '../_components/_Layout.svelte';
	import Header from '../_components/_Header.svelte';

	const metaTags = ((title = 'Transferring Tickets - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/transfer-a-ticket`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header center={true} pretext={'Event Preparation'}>Transferring and Assigning Tickets</Header>
	<section>
		<div class="prose prose-lg mx-auto text-gray-500">
			<p>
				You've purchased a bunch of tickets, or, unfortunately, are no longer able to attend and
				need to transfer/assign the ticket(s) to someone else. That's no problem, read on to see how
				to do it.
			</p>

			<div class="scale-75 transform text-center">
				<div class="space-x-8">
					<StandardLink href="/my/settings/order-history/">Order History</StandardLink>
					<StandardLink href="/my/settings/tickets/">My Assigned Tickets</StandardLink>
				</div>
			</div>

			<p>
				Tickets can only be transferred by the person who has the order for that ticket. If you were
				transferred a ticket, you are unable to transfer that ticket to someone else. Only the order
				holder can transfer tickets.
			</p>

			<h2>Transferring/Assigning Tickets</h2>
			<p>
				Head over to your <a href="/my/settings/order-history/"> Order History </a> where you'll see
				a list of your orders. Listed under each order will be its tickets as either assigned or unassigned.
			</p>

			<p>
				Transferring is easy, just enter a valid THAT.us account profile email address and click
				transfer. The page will inform you if the email address is not found. Check with the person
				you are transferring the ticket to for the email address they're using in their profile (<strong
					>Note:</strong> Their profile email address may be different than their login email address)
			</p>

			<div class="transform text-center">
				<figure>
					<img
						class="lazyload"
						src="/images/order-history-example.jpg"
						alt="order history example" />
					<figcaption class="scale-75">
						Order history example with two orders each with one ticket
					</figcaption>
				</figure>
			</div>

			<p>
				Once transferred, that Camper will receive an email with further instructions on how to
				register. They will also be granted access to THAT event.
			</p>
			<p>
				If a ticket was transferred/assigned to you it will be listed under your profile at
				<a href="/my/settings/tickets/">Event Tickets</a>.
			</p>

			<h2>Family Tickets</h2>
			<p>
				All family tickets (Campmate, Geekling, etc.) also need to be assigned to someone. If the
				family member isn't old enough to have a THAT account or doesn't wish to have one, then
				simply assign the family ticket to the Camper they are coming with.
			</p>
		</div>
	</section>
</Layout>
