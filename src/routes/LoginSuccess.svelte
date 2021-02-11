<script>
  import { ModalNoAction } from '../elements';
  import metaTagsStore from '../store/metaTags';

  metaTagsStore.set({
    title: 'Login Success - THAT',
    description: '',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/login-success`,
    },
  });
</script>

<div>
  <ModalNoAction
    title="Unlocking THAT"
    text="Parsing JSON, Validating Tokens, and configuring THAT."
  />
</div>
