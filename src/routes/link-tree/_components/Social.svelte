<script>
	export let network;

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

	let socialIcon, ariaLabel;

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

<Icon data={socialIcon} {ariaLabel} class="h-12 w-12 text-white" />
