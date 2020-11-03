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
  } from 'svelte-awesome/icons';

  export let network;
  export let href;

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
  }
</script>

<a href="{href}" target="_blank" tabindex="-1" rel="noopener">
  <Icon
    data="{socialIcon}"
    class="transform hover:scale-125 cursor-pointer mr-2 h-5 w-5 text-gray-400 hover:text-that-blue focus:underline
    transition ease-in-out duration-150"
  />
</a>
