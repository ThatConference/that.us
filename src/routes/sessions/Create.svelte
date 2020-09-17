<script>
  // 3rd Party
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';
  import Typewriter from 'svelte-typewriter';

  // UI Support
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';

  // data
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  // stores
  import currentEvent from '../../store/currentEvent';

  // utilities
  import metaTagsStore from '../../store/metaTags';
  import { tagEvent } from '../../utilities/gtag';
  import logEvent from '../../utilities/eventTrack';
  import { format } from './formatRequest';
  import { user } from '../../utilities/security.js';

  const { create } = sessionsApi(getClient());

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    setSubmitting(true);

    const newSession = format(values);
    const { id } = await create(newSession, $currentEvent.eventId);

    tagEvent('session_created', 'session', $user.sub);
    logEvent('session_created');

    setSubmitting(false);
    navigateTo(`/sessions/${id}?edit=true&isNew=true`, { replace: true });
  }

  metaTagsStore.set({
    title: 'Create a New... - THAT',
    description:
      'Create a New [Session, Code Review, Open Space, Chat], you get the idea.',
    openGraph: {
      type: 'website',
      url: `https://that.us/sessions/create`,
    },
  });
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader>
      <LinkButton href="/sessions" text="Return to THAT Board" />

      <div class="flex space-x-2" slot="title">
        <span>Create a new</span>
        <div class="italic">
          <Typewriter loop cursor="white" interval="{[50, 60, 80]}">
            <span>Presentation.</span>
            <span>Open Space.</span>
            <span>Code Review.</span>
            <span>Panel Discussion.</span>
            <span>Office Hours.</span>
            <span>Chat.</span>
            <span>Q&A.</span>
            <span>AMA.</span>
            <span>you decide.</span>
          </Typewriter>
        </div>
      </div>
    </ActionHeader>
  </div>

  <div slot="body">
    <SessionForm handleSubmit="{handleSubmit}" />
  </div>
</StackedLayout>
