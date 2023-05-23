<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Standard as StandardLink } from '$elements/links';
	import Layout from '../_components/_Layout.svelte';
	import Header from '../_components/_Header.svelte';

	let { user } = data;
	const iCalUrl = user.profile.favoritesICalendarUrl;

	const metaTags = ((title = 'My Favorites ICalendar Help - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Learn how to add your favorites to your calendar.',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/my-favorites-icalendar`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header center={true} pretext={'Cool Hacks'}>Adding My Favorites to Your Calendar</Header>
	<section>
		<div class="prose prose-lg mx-auto text-gray-500">
			<p>
				Get all your favorites right in your calendar. By copying the link below into your favorite
				calendar program you can have an up-to-date list of your favorites. Right where you want
				them!
			</p>
			<h2>Your Personal iCalendar Link</h2>
			{#if user.isAuthenticated}
				<div class="m-10">
					<span class="sm:hidden md:inline">{iCalUrl}</span>
					<button
						id="copy-to-clipboard"
						class="cursor-pointer rounded-md border-2 border-transparent bg-thatBlue-500 px-8 py-3
					text-center text-base font-medium leading-6 text-white shadow transition
					duration-150 ease-in-out hover:bg-thatBlue-400 focus:border-thatBlue-700
					focus:outline-none focus:ring-that-blue
					md:ml-2 md:px-5 md:py-2 md:text-lg"
						title="copy to clipboard"
						on:click={async () => {
							const cbButton = document.querySelector('#copy-to-clipboard');
							await navigator.clipboard.writeText(iCalUrl);
							cbButton.innerText = 'Copied!';
							cbButton.classList.add('bg-thatOrange-400');
							cbButton.classList.remove('hover:bg-thatBlue-400');
							setTimeout(() => {
								cbButton.innerText = 'Copy URL';
								cbButton.classList.remove('bg-thatOrange-400');
								cbButton.classList.add('hover:bg-thatBlue-400');
							}, 1500);
						}}>
						Copy URL
					</button>
				</div>
			{:else}
				<div class="m-10">
					<StandardLink rel={'external'} href={'/login/?returnTo=/support/my-favorites-icalendar'}>
						Login
						<span aria-hidden="true">&rarr;</span>
					</StandardLink>
				</div>
			{/if}
		</div>
		<div class="prose prose-lg mx-auto text-gray-500">
			<h2>How to Use the ICalendar URL</h2>
			<ol>
				<li>Copy the link above. You'll need to add that to your calendar program.</li>
				<li>
					Determine the calendar software: Identify the calendar software or application you are
					using, as the steps may differ slightly depending on the platform. Common examples include
					Google Calendar, Microsoft Outlook, Apple Calendar, and various mobile calendar apps.
				</li>
				<li>
					Open your calendar application: Launch the calendar software on your computer or mobile
					device. Ensure that you are signed in with the appropriate account if required.
				</li>
				<li>
					Locate the "Add Calendar" or "Import" option: Look for a feature within your calendar
					application that allows you to add or import an external calendar. This option is usually
					found in the settings or preferences section.
				</li>
				<li>
					Choose the import method: Depending on your calendar software, you may have different
					import methods available. Here are a few common ones:
					<ol>
						<li>
							URL import: If you have a direct URL to the ICS feed, select the "URL" or "From URL"
							option. Paste the ICS feed link you obtained in step 1 into the provided field.
						</li>
						<li>
							File import (not recommended): If you import an ICS file instead of referring to a URL
							"feed", your calendar entries will not update as you addd and change your favorites.
						</li>
					</ol>
				</li>
				<li>
					Configure import settings (if available): Some calendar applications allow you to adjust
					import settings before adding the calendar. For example, you may be able to choose a
					specific calendar within your account, set a custom name or color for the imported
					calendar, or specify the frequency of updates from the ICS feed.
				</li>
				<li>
					Confirm the import: Once you have provided the necessary information, click the "Import"
					or "Add Calendar" button to initiate the import process. The calendar application will
					attempt to retrieve the events from the ICS feed.
				</li>
				<li>
					Wait for the import to complete: Depending on the size of the calendar and your internet
					connection speed, it may take a few moments for the import process to finish. Be patient
					and allow the application to fetch and populate the events into your calendar.
				</li>
				<li>
					Verify the imported calendar: After the import process completes, navigate to your
					calendar view and check if the imported calendar appears. It may have a distinct color or
					name based on your import settings.
				</li>
			</ol>
		</div>
	</section>
</Layout>
