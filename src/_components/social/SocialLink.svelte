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
	export let ariaLabel;
	export let isLast = false;

	let socialIcon;

	switch (network) {
		case 'FACEBOOK':
			socialIcon = facebook;
			ariaLabel = 'Facebook';
			break;
		case 'TWITTER':
			socialIcon = twitter;
			ariaLabel = 'Twitter';
			break;
		case 'GITHUB':
			socialIcon = github;
			ariaLabel = 'Github';
			break;
		case 'INSTAGRAM':
			socialIcon = instagram;
			ariaLabel = 'Instagram';
			break;
		case 'WEBSITE':
			socialIcon = link;
			ariaLabel = 'Website';
			break;
		case 'LINKEDIN':
			socialIcon = linkedin;
			ariaLabel = 'LinkedIn';
			break;
		case 'YOUTUBE':
			socialIcon = youtubePlay;
			ariaLabel = 'YouTube';
			break;
		case 'TWITCH':
			socialIcon = twitch;
			ariaLabel = 'Twitch';
			break;
		case 'DRIBBBLE':
			socialIcon = dribbble;
			ariaLabel = 'Dribble';
			break;
		case 'MEDIUM':
			socialIcon = medium;
			ariaLabel = 'Medium';
			break;
		case 'STACK_OVERFLOW':
			socialIcon = stackOverflow;
			ariaLabel = 'Stack Overflow';
			break;
		case 'SLACK':
			socialIcon = slack;
			ariaLabel = 'Slack';
			break;
	}
</script>

<a {href} aria-label={ariaLabel} target="_blank" rel="noopener" >
	<Icon
		data={socialIcon}
		class={`transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer ${
			!isLast ? 'mr-2' : ''
		} h-5 w-5 text-gray-400 hover:text-that-blue focus:underline`}
	/>
</a>
