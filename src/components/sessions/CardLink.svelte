<script>
  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';

  export let href;
  export let icon;
  export let text;
</script>

<Link
  {href}
  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4
  text-sm leading-5 text-gray-700 font-medium border border-transparent
  rounded-bl-lg hover:text-gray-300 focus:outline-none focus:shadow-outline-blue
  focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
>
  <Icon data="{icon}" class="w-5 h-5" />
  <span class="ml-3">{text}</span>
</Link>
