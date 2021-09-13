<script>
	export let registrations = [];

	import Toggle from '$elements/Toggle.svelte';

	import OrderView from './_OrderView.svelte';
	import TicketView from './_TicketView.svelte';

	let view = TicketView;
	let viewByOrder = false;
	let registrationsFiltered = [];

	$: if (viewByOrder) {
		view = OrderView;
		registrationsFiltered = registrations;
	} else {
		view = TicketView;
		registrationsFiltered = registrations.reduce((acc, cur) => {
			return acc.concat(cur.orderAllocations);
		}, []);
	}
</script>

<div class="mt-12">
	<svelte:component this={view} registrations={registrationsFiltered}>
		<div slot="toggle">
			<Toggle title="Order View" subTitle="List by orders" bind:checked={viewByOrder} />
		</div>
	</svelte:component>
</div>
