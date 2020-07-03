<script>
  import { Link } from 'yrv';

  export let href;
  export let text;
</script>

<Link
  {href}
  class="inline-flex items-center px-6 py-3 border border-transparent text-base
  leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500
  focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo
  active:bg-indigo-700 transition ease-in-out duration-150"
>
  {text}
</Link>
