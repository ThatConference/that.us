<script>
	import { goto } from '$app/navigation';

	let currentPath = window.location.pathname.replace('sessions', 'activities');
	goto(`${currentPath}${window.location.search}`);
</script>
