<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { share } from 'svelte-awesome/icons';
  import Clipboard from 'clipboard';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { Tag } from '../../elements';
  import Header from '../../elements/layouts/profile/_Header.svelte';

  const communityTags = [
    '#node',
    '#javascript',
    '#opensource',
    '#foo',
    '#foo',
    '#foo',
    '#node',
    '#javascript',
    '#opensource',
    '#foo',
    '#foo',
    '#foo',
    '#node',
    '#javascript',
    '#opensource',
    '#foo',
    '#foo',
    '#foo',
    '#node',
    '#javascript',
    '#opensource',
    '#foo',
    '#foo',
    '#foo',
  ];

  let clipboard;
  let copiedText;

  onMount(() => {
    clipboard = new Clipboard('#shareUrl');

    clipboard.on('success', function (e) {
      copiedText = 'Copied!';
    });
  });

  onDestroy(() => {
    clipboard.destroy();
  });
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
    <div class="max-w-2xl mx-auto flex justify-center lg:col-span-3">
      <img
        class="max-h-60"
        src="/images/logos/logo-nodejs.svg"
        alt="javascript logo"
      />
    </div>
    <div class="mt-12 lg:mt-0 lg:col-start-4 lg:col-span-9">
      <div class="flex flex-col space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <Header subtitle="Community Spotlight">Node.js</Header>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              id="shareUrl"
              data-clipboard-text="{`https://that.us/communities/`}"
              class="px-4 py-2 rounded-md shadow text-base leading-6 font-medium border-2
                border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
                hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
                focus:shadow-outline-thatBlue-500 focus:border-thatBlue-800 transition
                duration-150 ease-in-out md:text-lg md:px-10"
            >
              {#if copiedText}
                <span>{copiedText}</span>
              {:else}
                <Icon data="{share}" class="" />
              {/if}
            </button>

            <StandardButton class="h-3/4" on:click="{console.log('clicked')}">
              Follow
            </StandardButton>
          </div>
        </div>

        <div>
          <p>
            Bacon ipsum dolor amet ground round meatball ham hock ribeye strip
            steak bacon tenderloin pig beef ribs meatloaf jerky chuck porchetta
            corned beef boudin. Pork chop shank tail, salami sausage ham hock
            swine. Frankfurter sirloin prosciutto cow tongue tail fatback pork
            hamburger pancetta t-bone. Picanha pig turducken doner hamburger
            flank ham hock beef ribs sausage prosciutto jerky ground round.
            Tenderloin pork chop landjaeger ball tip swine.
          </p>
        </div>

        <div class="flex flex-wrap justify-center items-center space-x-4">
          {#each communityTags as tag, i (i)}
            <div in:fade="{{ delay: i * 100 }}">
              <Tag>{tag}</Tag>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
