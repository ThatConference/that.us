<script>
	import Icon from 'svelte-awesome';
	import {
		link,
		linkedin,
		facebook,
		twitter,
		instagram,
		github,
		youtubePlay,
		twitch,
		dribbble,
		medium,
		stackOverflow,
		slack
	} from 'svelte-awesome/icons';

	export let network;
	export let href;
	export let isLast = false;

	let socialIcon;

	switch (network) {
		case 'FACEBOOK':
			socialIcon = facebook;
			break;
		case 'TWITTER':
			socialIcon = twitter;
			break;
		case 'GITHUB':
			socialIcon = github;
			break;
		case 'INSTAGRAM':
			socialIcon = instagram;
			break;
		case 'WEBSITE':
			socialIcon = link;
			break;
		case 'LINKEDIN':
			socialIcon = linkedin;
			break;
		case 'YOUTUBE':
			socialIcon = youtubePlay;
			break;
		case 'TWITCH':
			socialIcon = twitch;
			break;
		case 'DRIBBBLE':
			socialIcon = dribbble;
			break;
		case 'MEDIUM':
			socialIcon = medium;
			break;
		case 'STACK_OVERFLOW':
			socialIcon = stackOverflow;
			break;
		case 'SLACK':
			socialIcon = slack;
			break;
	}
</script>

<a {href} target="_blank" rel="noopener">
	<Icon
		data={socialIcon}
		class={`transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer ${
			!isLast ? 'mr-2' : ''
		} h-5 w-5 text-gray-400 hover:text-that-blue focus:underline`}
	/>
</a>
