<script>
	export let followers = [];

	import MemberCard from '$components/members/MemberCard.svelte';
</script>

<div class="max-w-screen-xl mx-auto px-8">
	<div class="relative py-20 text-center">
		<h1
			class="text-3xl leading-8 font-extrabold tracking-tight text-thatBlue-800 sm:text-4xl sm:leading-10"
		>
			These geeks just signed up!
		</h1>
	</div>

	<div class="relative">
		<ul
			class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5"
		>
			{#each followers as m (m.id)}
				<li class="col-span-1">
					<MemberCard {...m} />
				</li>
			{/each}
		</ul>
	</div>
</div>
