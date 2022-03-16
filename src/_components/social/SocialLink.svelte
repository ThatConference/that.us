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
		slack
	} from '$components/svelte-awesome-icons';

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
		case 'SLACK':
			socialIcon = slack;
			ariaLabel = 'Slack';
			break;
	}
</script>

<a {href} aria-label={ariaLabel} target="_blank" rel="noopener">
	<Icon
		data={socialIcon}
		class={`transform cursor-pointer transition duration-500 ease-in-out hover:scale-125 ${
			!isLast ? 'mr-2' : ''
		} h-5 w-5 text-gray-400 hover:text-that-blue focus:underline`} />
</a>
