<script>
	export let countries = 26;
	export let stats;
</script>

<section class="py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h2
				class="text-center text-4xl font-semibold leading-10 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-none"
			>
				Trusted by geeks from
				{countries}
				countries
			</h2>
			<p class="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
				Every day is a new opportunity to help someone or level up yourself.
			</p>
		</div>
		<dl
			class="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3
          sm:gap-8"
		>
			<div class="flex flex-col">
				<dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Members</dt>
				<dd class="order-1 text-5xl font-extrabold leading-none text-thatBlue-700">
					{stats.totalMembers}
				</dd>
			</div>

			<div class="mt-10 flex flex-col sm:mt-0">
				<dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
					Activities Completed
				</dt>
				<dd class="order-1 text-5xl font-extrabold leading-none text-thatBlue-700">
					{stats.pastActivities}
				</dd>
			</div>

			<div class="mt-10 flex flex-col sm:mt-0">
				<dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Hours Served</dt>
				<dd class="order-1 text-5xl font-extrabold leading-none text-thatBlue-700">
					{stats.hoursServed}
				</dd>
			</div>
		</dl>
	</div>
</section>
