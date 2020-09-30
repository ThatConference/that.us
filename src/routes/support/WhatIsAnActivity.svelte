<script>
  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'What is an Activity? - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/join-activity`,
    },
  });
</script>

<Layout>
  <Header center="{true}">What is an Activity?</Header>
  <section>
    <div class="prose prose-lg text-gray-500 mx-auto">
      <p>
        <strong>Activities</strong> are topic-based scheduled gatherings that anyone
        can create for any multitude of reasons in which anyone can join. An activity
        is simple, a video call in the browser with no tools required. Every Activity
        has a chat window, the ability to share your desktop and enables your webcam
        and microphone. You choose the format that best suits the topic and the people
        in the conversation.
      </p>

      <h2>What makes a good Activity?</h2>
      <blockquote>
        <p>
          An activity's success shouldn't be graded on the number of people in
          attendance but rather the conversation which was had and the knowledge
          that was shared.
        </p>
      </blockquote>

      <p>
        Yes anything can be an Activity. Activies are about the people involved
        and the conversation that will be had. They're meant to be dynamic and
        highly interactive. The topic and the user's problems should determine
        the format to allow everyone to learn together. So what can you do, well
        anything but here are a few things that have happened to date:
      </p>

      <ul>
        <li>Presentations</li>
        <li>User group meetings</li>
        <li>Virtual conferences</li>
        <li>Office Hours</li>
        <li>Code Reviews</li>
        <li>Design Reviews</li>
        <li>Interactive Workshops</li>
        <li>Q&A</li>
        <li>AMA</li>
        <li>Just Get Together and Chat</li>
      </ul>

      <div class="transform scale-90 text-center">
        <figure>
          <img
            class="w-full rounded-lg shadow"
            src="/images/ActivityDetailExample.jpg"
            alt=""
          />
          <figcaption>
            Example: product review and sprint planning Activity.
          </figcaption>
        </figure>
      </div>

      <h2>How long can an Activity be?</h2>
      <p>
        The length of an Activity is up to you. An Activity may be a short 30
        minutes or last all day. We have seen quick 30 minute issue triage, to
        an entire weekend hackathon-type activities. It's entirely up to you and
        what you are trying to achieve. In the example above you will see our
        bi-weekly sprint review which typically lasts for an hour.
      </p>

      <h2>Who can create and who can join an Activity?</h2>
      <p>
        Anybody and Anybody! That's correct. Anyone with an active public THAT
        account is allowed to create an activity. As for joining, anyone with an
        active THAT account can join.
      </p>
    </div>
    <div
      class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
    >
      <div class="flex space-x-4 text-base">
        <StandardLink href="/support/welcome">Getting Started</StandardLink>
        <HighlightLink href="/support/joining-an-activity">
          Joining an Activity
        </HighlightLink>
      </div>
    </div>
  </section>
</Layout>
