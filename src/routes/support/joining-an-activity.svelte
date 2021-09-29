<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink, Standard as StandardLink } from '$elements/links';

	import Layout from './_components/_Layout.svelte';
	import Header from './_components/_Header.svelte';

	const metaTags = ((title = 'Joining an Activity - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/join-activity`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header center={true}>Joining an Activity</Header>
	<section>
		<div class="prose prose-lg text-gray-500 mx-auto">
			<p>
				<strong>Click the join button.</strong> Yes, it's just THAT simple. The join button enables itself
				5 minutes before the scheduled start time (in your timezone0) and will remain active for the
				duration of the activity. THAT works in any browser and you just need to enable your webcam and
				microphone. We do require everyone to log in before joining any Activity. Your mic will always
				be muted by default and your camera will be enabled. Activities are currently limited to 100
				concurrent attendees.
			</p>

			<div class="transform scale-75 text-center">
				<figure>
					<img
						class="rounded-lg shadow"
						src="/images/ActivityJoinExample.jpg"
						alt=""
						loading="lazy"
					/>
					<figcaption>Example Activity: join on the bottom.</figcaption>
				</figure>
			</div>

			<h2>Activity Etiquette</h2>
			<p>
				We want everyone to be epic and help one another. We've compiled a list of guiding
				principals:
			</p>
			<ul>
				<li>Always be nice.</li>
				<li>Raise hand to speak.</li>
				<li>Mute yourself when not speaking.</li>
				<li>Speak clearly so others can hear you.</li>
				<li>Create space so others can speak.</li>
				<li>Be careful not to speak over or interrupt others while they are speaking.</li>
				<li>Turn your camera on so everyone else knows you're not a cyborg.</li>
				<li>
					Use care with humor. If you feel the need to use humor during meetings, make sure that
					it's appropriate for your audience. THAT serves a global audience, and sometimes while
					many speak English not everything translates well.
				</li>
				<li>Keep your cool.</li>
				<li>Dress appropriately.</li>
			</ul>
		</div>

		<div
			class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
		>
			<div class="flex space-x-4 text-base">
				<StandardLink href="/support/what-is-an-activity/">What Is An Activity</StandardLink>
				<HighlightLink href="/support/creating-an-activity/">Creating an Activity</HighlightLink>
			</div>
		</div>
	</section>
</Layout>
