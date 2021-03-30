<script>
  import { router, Link } from 'yrv';

  import { Error } from '../../elements/modals';
  import { ActionHeader } from '../../elements';
  import metaTagsStore from '../../store/metaTags';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Nav from '../../components/nav/interiorNav/Top.svelte';

  const { activityId } = $router.params;

  metaTagsStore.set({
    title: 'Access Denied - THAT',
    description: 'Your access was denied to join this activity.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/join/access-denied`,
    },
  });
</script>

<StackedLayout bodyBackgroundColor="bg-gray-100">
  <div slot="header">
    <Nav />
    <ActionHeader title="Access Denied" />
  </div>

  <div slot="body">
    <div class="h-24">
      <Error
        title="Access Denied"
        text="An event ticket or active membership is required to join this Activity."
        action="{{
          title: 'View Activities',
          href: '/activities',
        }}"
        returnTo="{{
          title: 'Retry Joining',
          href: `/join/${activityId}`,
        }}" />
    </div>
  </div>
</StackedLayout>
