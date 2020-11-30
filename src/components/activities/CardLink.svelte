<script>
  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';

  export let href;
  export let icon;
  export let text;
</script>

<Link
  href="{href}"
  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2
  text-xs leading-4 text-gray-700 font-medium border border-transparent
  rounded-bl-lg hover:text-gray-300 focus:outline-none focus:ring-blue
  focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
>
  <Icon data="{icon}" class="w-4 h-4" />
  <span class="ml-3">{text}</span>
</Link>
