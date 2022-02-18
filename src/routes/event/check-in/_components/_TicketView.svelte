<script>
	export let registrations = [];

	import Fuse from 'fuse.js'; // https://fusejs.io/api/options.html

	import Toggle from '$elements/Toggle.svelte';

	import Ticket from './_Ticket.svelte';
	// todo.. need a better top level reporting.. this isn't a valid ssr component? not sure what that means
	// import SemiCircle from './_SemiCircle.svelte';

	const searchOptions = {
		// isCaseSensitive: false,
		// includeScore: true,
		shouldSort: true,
		// includeMatches: false,
		findAllMatches: false,
		minMatchCharLength: 3,
		// location: 0,
		threshold: 0.2,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: [
			'allocatedTo.firstName',
			'allocatedTo.lastName',
			'allocatedTo.email',
			'purchasedBy.firstName',
			'purchasedBy.lastName',
			'purchasedBy.email',
			'product.name'
		]
	};

	let registrationsFiltered = [];
	let registrationsSearched = [];
	let searchterm = '';
	let viewAll = false;

	let statsCounselorTotal = 0;
	let statsCounselorCheckedIn = 0;

	let statsCamperTotal = 0;
	let statsCamperCheckedIn = 0;

	let statsVirtualCamperTotal = 0;
	let statsVirtualCamperCheckedIn = 0;

	let statsCampSwagTotal = 0;
	let statsCampSwagCheckedIn = 0;

	let statsPigRoastTotal = 0;
	let statsPigRoastCheckedIn = 0;

	$: if (searchterm === '') {
		registrationsSearched = registrationsFiltered;
	} else {
		registrationsSearched = fuse.search(searchterm).map((r) => r.item);
	}

	$: if (viewAll) {
		registrationsFiltered = [...registrations];
	} else {
		registrationsFiltered = registrations.filter((x) => !x.hasCheckedIn);
	}

	$: {
		registrations.forEach((r) => {
			switch (r.product.name.toUpperCase()) {
				//In-Person Counselors
				case 'COUNSELOR IN-PERSON':
					statsCounselorTotal = statsCounselorTotal + 1;
					statsCounselorCheckedIn = r.hasCheckedIn
						? statsCounselorCheckedIn + 1
						: statsCounselorCheckedIn;
					break;

				case 'EVERYTHING CAMPER':
				case 'CAMPER':
				case 'CAMPER NO FOOD':
					statsCamperTotal = statsCamperTotal + 1;
					statsCamperCheckedIn = r.hasCheckedIn ? statsCamperCheckedIn + 1 : statsCamperCheckedIn;
					break;

				case 'VIRTUAL CAMPER':
					statsVirtualCamperTotal = statsVirtualCamperTotal + 1;
					statsVirtualCamperCheckedIn = r.hasCheckedIn
						? statsVirtualCamperCheckedIn + 1
						: statsVirtualCamperCheckedIn;
					break;

				case 'CAMP SWAG':
					statsCampSwagTotal = statsCampSwagTotal + 1;
					statsCampSwagCheckedIn = r.hasCheckedIn
						? statsCampSwagCheckedIn + 1
						: statsCampSwagCheckedIn;
					break;

				case 'PIG ROAST':
					statsPigRoastTotal = statsPigRoastTotal + 1;
					statsPigRoastCheckedIn = r.hasCheckedIn
						? statsPigRoastCheckedIn + 1
						: statsPigRoastCheckedIn;
					break;

				default:
					break;
			}
		});
	}

	$: fuse = new Fuse(registrations, searchOptions);
</script>

<section>
	<div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
		<input
			autofocus
			class="form-input rounded-md border"
			bind:value={searchterm}
			placeholder="type to search..."
		/>

		<slot name="toggle" />

		<Toggle title="All" subTitle="Regardless of status" bind:checked={viewAll} />
	</div>

	<div class="mt-12 flex flex-col justify-center">
		<!-- <div class="flex justify-evenly">
			<SemiCircle
				title="Counselors"
				series={((statsCounselorCheckedIn / statsCounselorTotal) * 100).toFixed()}
			/>
			<SemiCircle
				title="Campers"
				series={((statsCamperCheckedIn / statsCamperTotal) * 100).toFixed()}
			/>
			<SemiCircle
				title="Virtual Campers"
				series={((statsVirtualCamperCheckedIn / statsVirtualCamperTotal) * 100).toFixed()}
			/>
			<SemiCircle
				title="Camp Swag"
				series={((statsCampSwagCheckedIn / statsCampSwagTotal) * 100).toFixed()}
			/>
			<SemiCircle
				title="Pig Roast"
				series={((statsPigRoastCheckedIn / statsPigRoastTotal) * 100).toFixed()}
			/>
		</div> -->
	</div>

	<div class="mt-12">
		<ul class="space-y-4">
			{#each registrationsSearched as ticket (ticket.id)}
				<li>
					<Ticket {ticket} />
				</li>
			{/each}
		</ul>
	</div>
</section>
