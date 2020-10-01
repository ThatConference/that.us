<script>
  import { fade } from 'svelte/transition';

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
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
    <div
      class="text-center md:max-w-2xl md:mx-auto lg:col-span-3
    lg:text-left"
    >
      <img
        class="max-h-60"
        src="/images/logos/logo-nodejs.svg"
        alt="javascript logo"
      />
    </div>
    <div class="lg:col-start-4 lg:col-span-9">
      <div class="flex flex-col space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <Header subtitle="Community Spotlight">Node.js</Header>
          </div>

          <div>
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
