<script>
	import Icon from 'svelte-awesome';
	import { plus } from '$components/svelte-awesome-icons';

	import { ActionHeader } from '$elements';
	import { Standard as StandardLink } from '$elements/links';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
</script>

<StackedLayout bodyBackgroundColor="bg-gray-100">
	<div slot="header">
		<Nav />
		<ActionHeader>
			<div class="flex space-x-2" slot="title">
				<span>Create a new activity.</span>
			</div>
		</ActionHeader>
	</div>

	<div slot="body">
		<div
			class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
			<div class="flex items-center space-x-5">
				<div class="flex-shrink-0">
					<div class="relative text-that-blue">
						<Icon data={plus} class="h-16 w-16 rounded-full" />
					</div>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Create Activity</h1>
					<p class="text-sm font-medium text-gray-500">
						Below is a short set of questions to best schedule a new activity.
					</p>
				</div>
			</div>
			<div
				class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
				<StandardLink href="/my/submissions/">View Your Past Submissions</StandardLink>
			</div>
		</div>

		<div class="mx-auto mt-8 max-w-3xl sm:px-6 lg:max-w-7xl">
			<slot />
		</div>
	</div>
</StackedLayout>
