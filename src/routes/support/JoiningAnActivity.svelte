<script>
  import { Link } from 'yrv';

  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Joining an Activity - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/join-activity`,
    },
  });
</script>

<Layout>
  <Header center="{true}">Joining an Activity</Header>
  <section>
    <div class="prose prose-lg text-gray-500 mx-auto">
      <p>
        Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed
        <strong>eget risus enim</strong>. Mattis mauris semper sed amet vitae
        sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
        tellus varius sit neque erat velit. Faucibus commodo massa rhoncus,
        volutpat. Dignissim sed eget risus enim. <a href="#">Mattis mauris
          semper</a> sed amet vitae sed turpis id.
      </p>

      <ul>
        <li>Quis elit egestas venenatis mattis dignissim.</li>
      </ul>

      <p>todo</p>

      <h2>From beginner to expert in 30 days</h2>
      <p>todo</p>

      <blockquote>
        <p>todo</p>
      </blockquote>

      <p>todo</p>

      <figure>
        <img
          class="w-full rounded-lg"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
          alt=""
          width="1310"
          height="873"
        />
        <figcaption>
          Sagittis scelerisque nulla cursus in enim consectetur quam.
        </figcaption>
      </figure>
    </div>
    <div
      class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
    >
      <div class="flex space-x-4 text-base">
        <StandardLink href="/activities">Upcoming Activities</StandardLink>
        <HighlightLink href="/support/what-is-an-activity">
          What is an Activity?
        </HighlightLink>
      </div>
    </div>
  </section>
</Layout>
