<script>
  export let router;
  export let documentReferrer = '/sessions';

  import { onMount } from 'svelte';
  import qs from 'query-string';
  import Meta from '../components/seo/Meta.svelte';

  import { login } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  const { signup = false } = qs.parse(location.search);

  onMount(async () => {
    await login(documentReferrer, signup);
  });
</script>

<Meta
  title="Login - THAT"
  description="todo"
  openGraph="{{ title: 'Login * THAT', description: 'todo', type: 'website', url: `https://that.us/login` }}"
/>

<div>
  <ModalNoAction
    title="Logging In..."
    text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
  />
</div>
