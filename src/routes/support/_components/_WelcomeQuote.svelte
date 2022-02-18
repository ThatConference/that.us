<script>
	import { fade } from 'svelte/transition';
</script>

<blockquote in:fade={{ delay: 300, duration: 2000 }} class="relative rounded-lg bg-white shadow-lg">
	<div class="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
		<img src="/images/THAT-Full-Wide.svg" alt="THAT" class="lazyload h-8" />
		<div class="relative mt-8 text-lg font-medium leading-7 text-gray-700">
			<svg
				class="absolute top-0 left-0 h-8 w-8 -translate-x-4 -translate-y-2
					transform text-thatBlue-100 opacity-50"
				fill="currentColor"
				viewBox="0 0 32 32"
			>
				<path
					d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
				/>
			</svg>
			<p class="prose prose-lg relative">
				👋 Hi! I wanted to be the first person here to send you a very warm welcome to THAT. I'm
				excited to have you here and can't wait to collaborate more with you. If you need help
				getting started or just have any questions, please just ask us in the chat below.
			</p>
		</div>
	</div>
	<cite
		class="flex items-center rounded-b-lg bg-thatBlue-700 py-5
			px-6 not-italic sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10"
	>
		<div class="sm:-mt-15 mr-4 rounded-full border-2 border-white sm:mr-6">
			<img
				class="lazyload h-12 w-12 rounded-full bg-indigo-300 sm:h-20 sm:w-20"
				src="https://that.imgix.net/members/1dcd59be-4677-474d-8087-e0b74e8ab810.jpeg?mask=ellipse&w=500&h=500&fit=crop"
				alt=""
			/>
		</div>
		<span class="font-semibold leading-6 text-thatBlue-200">
			<strong class="font-semibold text-white">Clark Sell</strong>
			<br class="sm:hidden" /> - Founder, THAT
		</span>
	</cite>
</blockquote>
