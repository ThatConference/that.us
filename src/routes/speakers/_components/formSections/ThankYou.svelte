<script>
	export let sessions = [];

	import Icon from 'svelte-awesome';
	import { linkedin, twitter } from '$components/svelte-awesome-icons';

	let sessionurl = `https://that.us/activities/${sessions[0].id}`;
	let tweettext = encodeURIComponent(
		`I'm speaking at @THATconference on ${sessions[0].title}. Learn more at`
	);
</script>

<div class="space-y-4">
	<slot name="header" />
</div>

<div>
	<p class="prose prose-lg mt-6">
		We did it! We knocked these tasks off that to-do list (Your room is booked, right)? We hope
		you're as pumped as we are, and before you know it, THAT Conference will be here. We are here to
		make you your most excellent. If you need help, you know where to find us.
	</p>

	<p class="prose prose-lg mt-12">
		Let us be the first to welcome you to THAT Conference, and on behalf of every geek and geekling,
		congratulations and thank you.
	</p>

	<p class="prose prose-lg mt-12">Help us tell the community you're speaking at THAT Conference.</p>
	<div class="justify-left mt-4 flex space-x-2">
		<a
			class="md:text-l rounded-md border-2 border-transparent bg-thatOrange-400 px-4 py-1
			text-base font-medium leading-6 text-white shadow transition duration-150
			ease-in-out hover:bg-thatOrange-500 focus:border-thatOrange-700 focus:outline-none
			focus:ring-that-orange md:py-2"
			target="_blank"
			rel="external noopener noreferrer"
			href="https://twitter.com/intent/tweet?text={tweettext}&url={sessionurl}">
			<div class="flex items-center space-x-2">
				<span>Share on</span>
				<Icon data={twitter} class={`h-8 w-8`} />
			</div>
		</a>
		<a
			class="md:text-l rounded-md border-2 border-transparent bg-thatOrange-400 px-4 py-1
		text-base font-medium leading-6 text-white shadow transition duration-150
		ease-in-out hover:bg-thatOrange-500 focus:border-thatOrange-700 focus:outline-none
		focus:ring-that-orange md:py-2"
			target="_blank"
			rel="external noopener noreferrer"
			href="https://www.linkedin.com/shareArticle?mini=true&url={sessionurl}">
			<div class="flex items-center space-x-2">
				<span>Share on</span>
				<Icon data={linkedin} class={`h-8 w-8`} />
			</div>
		</a>
	</div>

	<p class="prose prose-lg mt-12">
		Sincerly, <br />
		Clark, Carrie, and Brett
	</p>
</div>
