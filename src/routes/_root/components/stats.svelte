<script>
	export let countries = 26;
	export let stats;
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center">
			<h2
				class="text-3xl leading-9 font-extrabold text-white sm:text-4xl
            sm:leading-10"
			>
				Trusted by geeks from
				{countries}
				countries
			</h2>
			<p class="mt-3 text-xl leading-7 text-thatBlue-200 sm:mt-4">
				Every day is a new opportunity to help someone else or level up yourself.
			</p>
		</div>
		<dl
			class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3
          sm:gap-8"
		>
			<div class="flex flex-col">
				<dt class="order-2 mt-2 text-lg leading-6 font-medium text-thatBlue-200">Members</dt>
				<dd class="order-1 text-5xl leading-none font-extrabold text-white">
					{stats.totalMembers}
				</dd>
			</div>

			<div class="flex flex-col mt-10 sm:mt-0">
				<dt class="order-2 mt-2 text-lg leading-6 font-medium text-thatBlue-200">
					Activities Completed
				</dt>
				<dd class="order-1 text-5xl leading-none font-extrabold text-white">
					{stats.pastActivities}
				</dd>
			</div>

			<div class="flex flex-col mt-10 sm:mt-0">
				<dt class="order-2 mt-2 text-lg leading-6 font-medium text-thatBlue-200">Hours Served</dt>
				<dd class="order-1 text-5xl leading-none font-extrabold text-white">
					{stats.hoursServed}
				</dd>
			</div>
		</dl>
	</div>
</section>
