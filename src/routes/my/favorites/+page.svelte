<script>
	export let data;

	import dayjs from 'dayjs';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ModalWarning, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';
	import { Highlight as HighlightButton } from '$elements/buttons';
	import { csvGenerator } from '$utils/csv';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';

	let { activities } = data;

	const metaTags = ((title = 'My Favorites - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "You're list of favorited activities.",
			openGraph: {
				type: 'website',
				url: `https://that.us/my/favorites`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	const isDate = (checkDate) => dayjs(checkDate).isValid;

	const csvDownloadHandler = () => {
		const csvdata = activities.map((a) => ({
			id: a.id,
			startTime: isDate(a.startTime) ? dayjs(a.startTime).toISOString() : '',
			day: isDate(a.startTime) ? dayjs(a.startTime).format('dddd') : '',
			slot: isDate(a.startTime) ? dayjs(a.startTime).format('HH:mm') : '',
			room: a.location?.destination ? a.location?.destination : '',
			title: a.title ? a.title : '',
			speakers: a.speakers.map((s) => `${s.firstName} ${s.lastName}`).join(';'),
			priCategory: a.priCategory ? a.priCategory : '',
			sessionLink: `https://that.us/activites/${a.id}/`,
			sessionType: a.type
		}));

		const tableHeader = [
			'Id',
			'Start Time',
			'Day',
			'Slot',
			'Room',
			'Title',
			'Speakers',
			'Category',
			'Link',
			'Type'
		];

		const tableKeys = Object.keys(csvdata[0]);
		csvGenerator(csvdata, tableKeys, tableHeader, 'THAT-My-Favorites.csv');
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Favorites">
			<div class="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
				<HighlightLink href="/support/my-favorites-icalendar/">Subscribe</HighlightLink>
				<HighlightButton on:click={csvDownloadHandler}>Download</HighlightButton>
			</div>
		</ActionHeader>
	</div>

	<div slot="body">
		{#if activities.length > 0}
			<ActivityList reverse={true} {activities} />
		{:else}
			<div class="p-12">
				<ModalWarning
					title="No Favorites!"
					text="Hold on a minute! You haven't favorited any activities yet. Get
            on it!" />
			</div>
		{/if}
	</div>

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
